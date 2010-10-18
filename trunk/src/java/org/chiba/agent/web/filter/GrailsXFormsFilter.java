package org.chiba.agent.web.filter;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.servlet.ServletRequestContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.chiba.agent.web.WebFactory;
import org.chiba.agent.web.WebProcessor;
import org.chiba.agent.web.WebUtil;
import org.chiba.agent.web.event.DefaultUIEventImpl;
import org.chiba.agent.web.event.UIEvent;
import org.chiba.xml.config.Config;
import org.chiba.xml.config.XFormsConfigException;
import org.chiba.xml.dom.DOMUtil;
import org.chiba.xml.events.XMLEvent;
import org.chiba.xml.xforms.exception.XFormsException;

public class GrailsXFormsFilter
  implements Filter
{
  private static final Log LOG = LogFactory.getLog(GrailsXFormsFilter.class);
  protected WebFactory webFactory;
  protected String useragent;
  protected String defaultRequestEncoding = "UTF-8";
  private FilterConfig filterConfig;

  public void init(FilterConfig filterConfig)
    throws ServletException
  {
    this.filterConfig = filterConfig;
    this.useragent = filterConfig.getInitParameter("useragent");
    this.webFactory = new WebFactory();
    this.webFactory.setServletContext(filterConfig.getServletContext());
    try {
      this.webFactory.initConfiguration(this.useragent);
      this.defaultRequestEncoding = this.webFactory.getConfig().getProperty("defaultRequestEncoding", this.defaultRequestEncoding);
      this.webFactory.initLogging(getClass());
      this.webFactory.initTransformerService();
      this.webFactory.initXFormsSessionCache();
    } catch (XFormsConfigException e) {
      throw new ServletException(e);
    }
  }

  public void destroy()
  {
    if (LOG.isDebugEnabled())
      LOG.debug("cleanups allocated resources");
  }

  public void doFilter(ServletRequest srvRequest, ServletResponse srvResponse, FilterChain filterChain)
    throws IOException, ServletException
  {
    if (srvRequest.getCharacterEncoding() == null) {
      srvRequest.setCharacterEncoding(this.defaultRequestEncoding);
    }

    HttpServletRequest request = (HttpServletRequest)srvRequest;

    HttpServletResponse response = (HttpServletResponse)srvResponse;
    HttpSession session = request.getSession(true);
    if (request.getParameter("isUpload") != null)
    {
      handleUpload(request, response, session);
    } else if (("GET".equalsIgnoreCase(request.getMethod())) && (request.getParameter("submissionResponse") != null)) {
      doSubmissionReplaceAll(request, response);
    }
    else if (isXFormUpdateRequest(request)) {
      LOG.info("Start Update XForm");
      try
      {
        WebProcessor webProcessor = WebUtil.getWebProcessor(request, session);
        webProcessor.setRequest(request);
        webProcessor.setResponse(response);
        webProcessor.handleRequest();
      } catch (XFormsException e) {
        throw new ServletException(e);
      }
      LOG.info("End Update XForm");
    }
    else
    {
      LOG.info("Passing to Chain");
      BufferedHttpServletResponseWrapper bufResponse = new BufferedHttpServletResponseWrapper((HttpServletResponse)srvResponse);
      filterChain.doFilter(srvRequest, bufResponse);
      LOG.info("Returned from Chain");

      if (bufResponse.isCommitted()) {
        return;
      }
      if (this.useragent == null) {
        throw new ServletException("init-param 'useragent' must be defined in web.xml for XFormsFilter");
      }

      request.setAttribute("useragent", this.useragent);

      if (handleResponseBody(request, bufResponse)) {
        byte[] data = prepareData(bufResponse);
        if (data.length > 0) {
          request.setAttribute("XFormsInputStream", new ByteArrayInputStream(data));
        }
      }

      if (handleRequestAttributes(request)) {
    	  try {
           bufResponse.getWriter().close();
    	  } catch (IllegalStateException e) {
    		   bufResponse.getOutputStream().close();
    	        }
        LOG.info("Start Filter XForm");
        LOG.debug("request.getRequestURL() = " + request.getRequestURL().toString());
        WebProcessor webProcessor = null;
        try {
          webProcessor = WebFactory.createWebProcessor(request);
          webProcessor.setRequest(request);
          webProcessor.setResponse(response);
          webProcessor.setHttpSession(session);
          webProcessor.setBaseURI(request.getRequestURL().toString());
          webProcessor.setXForms();
          webProcessor.init();
          webProcessor.handleRequest();
          if (LOG.isDebugEnabled()) {
            LOG.debug(CacheManager.getInstance().getCache("xfSessionCache").getStatistics());
            DOMUtil.prettyPrintDOM(webProcessor.getXForms(), System.out);
          }
        }
        catch (Exception e) {
          LOG.error(e.getMessage(), e);
          if (webProcessor != null)
          {
            try {
              webProcessor.shutdown();
            } catch (XFormsException xfe) {
              LOG.error("Could not shutdown Processor: Error: " + xfe.getMessage() + " Cause: " + xfe.getCause());
            }

            session.setAttribute("chiba.exception", e);

            WebUtil.removeSession(webProcessor.getKey());
            String path = "/" + this.webFactory.getConfig().getProperty("error.page");
            this.filterConfig.getServletContext().getRequestDispatcher(path).forward(request, response);
          }
        }

        LOG.info("End Render XForm");
      } else {
        srvResponse.getOutputStream().write(bufResponse.getData());
        srvResponse.getOutputStream().close();
      }
    }
  }

  private void handleUpload(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws ServletException
  {
    response.setContentType("text/html");

    if (LOG.isDebugEnabled()) {
      LOG.debug("*** FluxHelper ***");
    }

    WebProcessor webProcessor = WebUtil.getWebProcessor(request, session);
    try {
      if (webProcessor == null) {
        throw new ServletException(Config.getInstance().getErrorMessage("session-invalid"));
      }
      if (LOG.isDebugEnabled()) {
        LOG.debug(this + ": xformssession:" + webProcessor.getKey());
      }
      UIEvent uiEvent = new DefaultUIEventImpl();
      uiEvent.initEvent("http-request", null, request);
      webProcessor.handleUIEvent(uiEvent);

      boolean isUpload = FileUpload.isMultipartContent(new ServletRequestContext(request));

      if (isUpload) {
        ServletOutputStream out = response.getOutputStream();
        out.println("<html><head><title>status</title></head><body></body></html>");
        out.close();
      }
    } catch (Exception e) {
      throw new ServletException(e);
    }
  }

  protected byte[] prepareData(BufferedHttpServletResponseWrapper bufResponse)
    throws UnsupportedEncodingException
  {
    return correctInstanceXMLNS(bufResponse.getData());
  }

  protected boolean handleRequestAttributes(HttpServletRequest request)
  {
    return (request.getAttribute("XFormsInputNode") != null) || (request.getAttribute("XFormsInputURI") != null) || (request.getAttribute("XFormsInputSource") != null) || (request.getAttribute("XFormsInputStream") != null);
  }

  protected boolean handleResponseBody(HttpServletRequest request, BufferedHttpServletResponseWrapper bufResponse)
    throws UnsupportedEncodingException
  {
    if (request.getAttribute("chiba.filter.parseResponseBody") != null) return true;

    if (request.getAttribute("chiba.filter.ignoreResponseBody") != null) return false;

    String acceptedContentType = this.webFactory.getConfig().getProperty("acceptContentTypePattern", "");
    if (!"".equals(acceptedContentType)) {
      if (acceptedContentType.equalsIgnoreCase("all_xml")) {
        if (bufResponse.hasXMLContentType()) return true; 
      }
      else {
        String contentType = bufResponse.getMediaType();
        if (Pattern.matches(acceptedContentType, contentType)) return true;
      }

    }

    if (disableReponseBodyParsing()) return false;

    String strResponse = bufResponse.getDataAsString();

    int xfNSDeclEnd = strResponse.indexOf("=\"http://www.w3.org/2002/xforms\"");
    if (xfNSDeclEnd != -1) {
      String temp = strResponse.substring(0, xfNSDeclEnd);
      int xfNSDeclStart = temp.lastIndexOf(':') + 1;
      String xfNSLocal = temp.substring(xfNSDeclStart);

      if (strResponse.contains('<' + xfNSLocal + ":model")) {
        return true;
      }
    }

    return false;
  }

  protected boolean disableReponseBodyParsing()
  {
    boolean ignoreResponse = false;
    try {
      ignoreResponse = Config.getInstance().getProperty("filter.ignoreResponseBody").equalsIgnoreCase("true");
    } catch (XFormsConfigException e) {
      ignoreResponse = false;
    }

    return ignoreResponse;
  }

  public boolean isXFormUpdateRequest(HttpServletRequest request)
  {
    if (!request.getMethod().equals("POST")) {
      return false;
    }
    String key = request.getParameter("sessionKey");
    WebProcessor webProcessor = WebUtil.getWebProcessor(key);
    if (webProcessor == null)
      return false;
    String actionURL;
    if (request.getQueryString() != null)
      actionURL = request.getRequestURL() + "?" + request.getQueryString();
    else {
      actionURL = request.getRequestURL().toString();
    }

    int posSessionKey = actionURL.indexOf("sessionKey");
    if (posSessionKey > -1) {
      char preSep = actionURL.charAt(posSessionKey - 1);
      if (preSep == '?') {
        if (actionURL.indexOf('&') > -1)
          actionURL = actionURL.substring(0, posSessionKey) + actionURL.substring(actionURL.indexOf('&') + 1);
        else
          actionURL = actionURL.substring(0, posSessionKey - 1);
      }
      else if (preSep == '&') {
        actionURL = actionURL.substring(0, posSessionKey - 1);
      }

    }

    return actionURL.equals(webProcessor.getContextParam("action-url"));
  }

  private byte[] removeDocumentTypePI(byte[] content)
    throws UnsupportedEncodingException
  {
    String buf = new String(content, "ISO-8859-1");

    int iStartDoctype = buf.indexOf("<!DOCTYPE");
    if (iStartDoctype > -1) {
      int iEndDoctype = buf.indexOf('>', iStartDoctype);

      String newBuf = buf.substring(0, iStartDoctype - 1);
      newBuf = newBuf + buf.substring(iEndDoctype + 1);
      return newBuf.getBytes("ISO-8859-1");
    }
    return content;
  }

  private byte[] correctInstanceXMLNS(byte[] content)
    throws UnsupportedEncodingException
  {
    String buffer = new String(content, "UTF-8");
    if (buffer.indexOf("<xforms:instance xmlns=\"\">") == -1) {
      String newBuf = buffer.replace("<xforms:instance>", "<xforms:instance xmlns=\"\">");
      return newBuf.getBytes("UTF-8");
    }

    return content;
  }

  protected void doSubmissionReplaceAll(HttpServletRequest request, HttpServletResponse response)
    throws IOException
  {
    HttpSession session = request.getSession(false);
    WebProcessor webProcessor = WebUtil.getWebProcessor(request, session);
    if ((session != null) && (webProcessor != null)) {
      if (LOG.isDebugEnabled()) {
        Enumeration keys = session.getAttributeNames();
        if (keys.hasMoreElements()) {
          LOG.debug("--- existing keys in session --- ");
        }
        while (keys.hasMoreElements()) {
          String s = (String)keys.nextElement();
          LOG.debug("existing sessionkey: " + s + ":" + session.getAttribute(s));
        }
      }

      Map submissionResponse = webProcessor.checkForExitEvent().getContextInfo();
      if (submissionResponse != null)
      {
        if (LOG.isDebugEnabled()) {
          LOG.debug("handling submission/@replace='all'");
          Enumeration keys = session.getAttributeNames();
          if (keys.hasMoreElements()) {
            LOG.debug("--- existing keys in http session  --- ");
            while (keys.hasMoreElements()) {
              String s = (String)keys.nextElement();
              LOG.debug("existing sessionkey: " + s + ":" + session.getAttribute(s));
            }
          }
          LOG.debug("--- no keys left in http session  --- ");
        }

        Map headerMap = (Map)submissionResponse.get("header");

        Iterator iterator = headerMap.keySet().iterator();
        while (iterator.hasNext()) {
          String name = (String)iterator.next();
          if (name.equalsIgnoreCase("Transfer-Encoding"))
          {
            continue;
          }

          String value = (String)headerMap.get(name);
          if (LOG.isDebugEnabled()) {
            LOG.debug("added header: " + name + "=" + value);
          }

          response.setHeader(name, value);
        }

        InputStream bodyStream = (InputStream)submissionResponse.get("body");
        OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
        for (int b = bodyStream.read(); b > -1; b = bodyStream.read()) {
          outputStream.write(b);
        }

        bodyStream.close();
        outputStream.close();

        WebUtil.removeSession(webProcessor.getKey());
        return;
      }
    }
    response.sendError(403, "no submission response available");
  }
}