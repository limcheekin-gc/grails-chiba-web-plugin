/* Copyright 2006-2010 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
import org.codehaus.groovy.grails.commons.ConfigurationHolder as CH

/**
 *
 * @author <a href='mailto:limcheekin@vobject.com'>Lim Chee Kin</a>
 *
 * @since 0.1
 */
class ChibaWebGrailsPlugin {
    // the plugin version
    def version = "0.1"
    // the version or versions of Grails the plugin is designed for
    def grailsVersion = "1.3.5 > *"
    // the other plugins this plugin depends on
    def dependsOn = [:]
    // resources that are excluded from plugin packaging
    def pluginExcludes = [
            "grails-app/views/error.gsp"
    ]
    
    def author = "Lim Chee Kin"
    def authorEmail = "limcheekin@vobject.com"
    def title = "Grails Chiba Web Plugin - Enabled XForms processing in Grails"
    def description = '''
 Grails Chiba Web Plugin is created to integrate Chiba (http://chiba.sourceforge.net/) 
 server-side XForms 1.1 implementation to Grails Framework. 
 
 Localisation, XPath and Dojo Toolkit 1.2.3 are supported.
 
 Project Site and Documentation: http://code.google.com/p/grails-chiba-web-plugin/
 Support: http://code.google.com/p/grails-chiba-web-plugin/issues/list
'''

    // URL to the plugin's documentation
    def documentation = "http://grails.org/plugin/chiba-web"

    def doWithWebDescriptor = { webXml ->
	def mappingElement = webXml.'context-param'
	def lastMapping = mappingElement[mappingElement.size()-1]
	lastMapping + {
		'context-param' {
			'param-name'("chiba.configfile")
			'param-value'("WEB-INF/chiba-config.xml")
            }
	}        
	
        mappingElement = webXml.'filter'
	lastMapping = mappingElement[mappingElement.size()-1]
	lastMapping + {
		'filter' {
			'filter-name'("XFormsFilter")
			'filter-class'("org.chiba.agent.web.filter.XFormsFilter")
			'init-param' {
			   'param-name'("useragent")
			   'param-value'(CH.config.chiba.web.useragent)			
                }
            }
	}        
	
        mappingElement = webXml.'filter-mapping'
	lastMapping = mappingElement[mappingElement.size()-1]
	lastMapping + {
            CH.config.chiba.web.xforms.filter.urlpatterns.each { urlpattern ->
		'filter-mapping' {
			'filter-name'("XFormsFilter")
			'url-pattern'(urlpattern)
		}
            }
	} 	
	
        mappingElement = webXml.'servlet'
	lastMapping = mappingElement[mappingElement.size()-1]
	lastMapping + {
		'servlet' {
			'servlet-name'("Flux")
			'servlet-class'("org.directwebremoting.servlet.DwrServlet")
			'init-param' {
			   'param-name'("debug")
			   'param-value'("true")			
                }
            }
		
		'servlet' {
			'servlet-name'("PlainHtml")
			'servlet-class'("org.chiba.agent.web.servlet.PlainHtmlServlet")
            }
				
		'servlet' {
			'servlet-name'("ViewServlet")
			'servlet-class'("org.chiba.agent.web.servlet.ViewServlet")
            }
	}        	
	
        mappingElement = webXml.'servlet-mapping'
	lastMapping = mappingElement[mappingElement.size()-1]
	lastMapping + {
		'servlet-mapping' {
			'servlet-name'("Flux")
			'url-pattern'("/Flux/*")
            }

		'servlet-mapping' {
			'servlet-name'("PlainHtml")
			'url-pattern'("/PlainHtml/*")
            }

		'servlet-mapping' {
			'servlet-name'("ViewServlet")
			'url-pattern'("/view")
            }
	} 		
		
    }

    def doWithSpring = {
        // TODO Implement runtime spring config (optional)
    }

    def doWithDynamicMethods = { ctx ->
        // TODO Implement registering dynamic methods to classes (optional)
    }

    def doWithApplicationContext = { applicationContext ->
        // TODO Implement post initialization spring config (optional)
    }

    def onChange = { event ->
        // TODO Implement code that is executed when any artefact that this plugin is
        // watching is modified and reloaded. The event contains: event.source,
        // event.application, event.manager, event.ctx, and event.plugin.
    }

    def onConfigChange = { event ->
        // TODO Implement code that is executed when the project configuration changes.
        // The event is the same as for 'onChange'.
    }
}
