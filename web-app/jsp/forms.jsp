<html>
<head>
	<title>Dokumente</title>
    <link rel="stylesheet" type="text/css" href="../styles/chiba-styles.css"/>
    <style type="text/css">
      td{padding:2px;}
    </style>

</head>
<%@ page import="org.apache.commons.logging.Log"%>
<%@ page import="org.apache.commons.logging.LogFactory"%>
<%@ page import="java.io.File"%>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.text.DateFormat" %>
<%@ page import="java.util.Date" %>
<%@ page session="true"%>

   <body text="black" link="black" vlink="black" alink="orange">

	<table width="100%" height="85%" cellpadding="10" cellspacing="0" border="0">
	<tr>
	
	<td valign="top">
<%!
    static Log cat = LogFactory.getLog("org.chiba.agent.web.jsp");

    String chibaRoot = null;
    String rootDir = null;

    public void jspInit() {

        // +++ read general parameters from web.xml
        chibaRoot = getServletConfig().getServletContext().getRealPath("");
        if (chibaRoot == null) {
            chibaRoot = getServletConfig().getServletContext().getRealPath(".");
        }
        rootDir = chibaRoot + "/";
    }

%>

<%
	String uri=request.getQueryString();
	String readDir=null;

	
	if (uri == null) {
		uri = "forms";
    }
    readDir = rootDir + uri;
	cat.debug("URI: " + uri);
	cat.debug("Read dir: " + readDir);
%>

<div style="font-size:14pt;font-style:sans-serif;padding-top:10px;padding-bottom:10px;">
    Chiba Pages Browser
</div>
<table width="100%" border="0" cellpadding="0" cellspacing="5"><tr><td>
Path: /<%=uri%>
</td></tr></table>

<table style="border:thin solid orange;" cellspacing="1" cellpadding="2" width="100%">

	<tr bgcolor="#faeeaa">
		<td align="left" width="10%">
			File
		</td>

		<td align="center" width="5%">
			<span style="color:darkred">non-scripted HTML</span>
		</td>

<%--
		<td width="5%" align="center">
			scripted HTML
		</td>
--%>

<%--
        <td>
            Source
        </td>
--%>
		<td>
            last update
		</td>
	</tr>
	<%

	//list files from documents directory
	
	File root=new File(readDir);
    if (!root.exists()) {
        root.mkdirs();
    }
	String[] files=root.list();
	cat.debug("files: " + files.length);
	File f=null;
	String up=null;
	if (files!=null)
	{
		if(uri.indexOf("/")!=-1){
			up=uri.substring(0,uri.lastIndexOf("/"));
			%>
			<tr bgcolor="#FCF6D3" style="border:thin solid orange;">
				<td valign="middle" colspan="5">
				<a href="forms.jsp?<%=up%>">
					<im3g src="<%=request.getContextPath()%>/resources/images/folder.gif" border="0" width="20" height="20" align="left">..
				</a>
				</td>
			</tr>				
			<%
		}

		for(int i=0;i< files.length;i++){
			File aFile=new File( files[i]);
			f=new File(readDir + "/" + aFile.getName());	
			
			if(f.isDirectory()){
			%>
					
				<tr bgcolor="#FCF6D3">
					<td valign="middle" colspan="5">
					<a href="<%=request.getContextPath()%>/jsp/forms.jsp?<%=uri%>/<%=aFile.getName()%>">
						<img src="<%=request.getContextPath()%>/resources/images/folder.gif" border="0" width="20" height="20" align="left"><%=aFile.getName()%>
					</a>
					</td>
			
				</tr>
			<%
			}
		}
	}
	root=new File(readDir);
	files=root.list();
	cat.debug ("files: " + files.length);

	if (files!=null)
	{
		for(int i=0;i< files.length;i++){
			File aFile=new File( files[i]);
			f=new File(readDir + "/" + aFile.getName());	


			if(!(f.isDirectory())){
	
			%>
				<tr bgcolor="#FCF6D3">

                    <td>
                        <%
                            if(aFile.getName().endsWith(".xhtml")){
                        %>
<%--
                        <a href="<%=request.getContextPath()%>/XFormsServlet?form=/<%=uri%>/<%=aFile.getName()%>"
                            onclick="this.href=this.href + '&js=enabled'">
                            <%=aFile.getName()%>
                        </a>
--%>
<%--
                        <a href="<%=request.getContextPath()%>/XFormsServlet?form=/<%=uri%>/<%=aFile.getName()%>"
                            onclick="this.href=this.href + '?js=enabled'">
                            <%=aFile.getName()%>
                        </a>
--%>
                        <a href="<%=request.getContextPath()%>/<%=uri%>/<%=aFile.getName()%>?useragent=html" onclick="this.href=this.href.substring(0,this.href.indexOf('?'));">
                            <%=aFile.getName()%>
                        </a>
<%--
                        <a href="<%=request.getContextPath()%>/<%=uri%>/<%=aFile.getName()%>"
                            onclick="this.href=this.href + '?js=enabled'">
                            <%=aFile.getName()%>
                        </a>
--%>
                        <%
                            }else{
                        %>
                            <%=aFile.getName()%>
                        <%
                            }
                        %>
                    </td>

                    <td align="center" valign="middle">
                        <%
                            if(aFile.getName().endsWith(".xhtml")){
                        %>
                        <%--<a href="<%=request.getContextPath()%>/XFormsServlet?form=/<%=uri%>/<%=aFile.getName()%>">--%>
                        <a href="<%=request.getContextPath()%>/<%=uri%>/<%=aFile.getName()%>">
                            <img src="<%=request.getContextPath()%>/resources/images/text.gif" border="0" width="20" height="20" align="center">
                        </a>
                        <%
                            }else{
                        %>
                            <img src="<%=request.getContextPath()%>/resources/images/text.gif" border="0" width="20" height="20" align="center">
                        <%
                            }
                        %>
					</td>

<%--
                    <td align="center" valign="middle">
                        <a href="<%=request.getContextPath()%>/XFormsServlet?form=/<%=uri%>/<%=aFile.getName()%>"
                            onclick="this.href=this.href + '&js=enabled'">
                            <img src="<%=request.getContextPath()%>/resources/images/text.gif" border="0" width="20" height="20" align="center">
                        </a>
					</td>
--%>

<%--
                    <td>
                            <a href="<%=request.getContextPath()%>/<%=uri%>/<%=aFile.getName()%>">source</a>
                    </td>
--%>
					<td>
                            <%= ""+ DateFormat.getDateTimeInstance(DateFormat.MEDIUM,DateFormat.MEDIUM).format(new Date(f.lastModified())) %>
					</td>
					
				</tr>
				<% 
				}
			}
	}
	%>

</table>
</td></tr></table>

<p align="right" style="font-size:8pt;">&copy; 2003-2005 Chiba</p>
</body>
</html>
