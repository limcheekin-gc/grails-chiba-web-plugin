# Overview #
Grails Chiba Web Plugin is created to integrate Chiba (http://chiba.sourceforge.net/) server-side XForms 1.1 implementation to Grails Framework. Localisation, XPath and Dojo Toolkit 1.2.3 are supported.

**Note :** The project owner no longer support this project since 30 Dec 2010, if you would like to take over, please contact the project owner.

# Installation #
Install the plugin into your project with the following command:
```
grails install-plugin chiba-web
```

# Configuration #
After the plugin installed into your project, the following configurations will be appended to your project's Config.groovy file:
```
chiba.web.useragent="dojo" // "dojo" or "html"
chiba.web.xforms.filter.urlpatterns=["*.xhtml"]
```

  * `chiba.web.useragent` - support dojo and html only. May extend to support more Javascript library such as JQuery UI, YUI, etc. in future releases.
  * `chiba.web.xforms.filter.urlpatterns` - support XHTML files only. Will include GSP files support.

# Run the application #
Run your application with the following command:
```
grails run-app
```

By open your browser at http://localhost:8080/[yourApplicationName]/index.html, you should see the following main screen (You still can access to Grails default main page, no amendment made for index.gsp):

![http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/main-screen.jpg](http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/main-screen.jpg)


---

You can view examples of XForms come with the installation by click on "Run Chiba" menu on the left of the screen, then you will see the following form listing screen:

![http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/form-listing-screen.jpg](http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/form-listing-screen.jpg)


---

Next, click on widgets.xhtml link, you will see the following Widgets screen demonstrates Dojo widgets that supported by Chiba Web:

![http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/widgets-screen.jpg](http://grails-chiba-web-plugin.googlecode.com/svn-history/r5/trunk/docs/images/widgets-screen.jpg)

# Version History #
**18-Oct-2010 0.1**
  * Default Chiba Web installation with XForms for XHTML support.

# To Do #
  * XForms for GSP support.

# Final Note #
We are welcome your feedback and would like to hear about in what project and how you use the plugin. You are welcome to join the project discussion topic at
http://grails.1312388.n4.nabble.com/ANN-Grails-Chiba-Web-Plugin-0-1-Released-Enabled-XForms-processing-in-Grails-td3001397.html