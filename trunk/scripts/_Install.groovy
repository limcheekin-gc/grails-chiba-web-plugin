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
 
  /**
 *
 * 
 * @author <a href='mailto:limcheekin@vobject.com'>Lim Chee Kin</a>
 *
 * @since 0.1
 */
 
// Move plugin related files
ant.move file:"${pluginBasedir}/grails-app/conf/chiba-config.xml", todir:"${basedir}/web-app/WEB-INF"
ant.move file:"${pluginBasedir}/grails-app/conf/log4j.xml", todir:"${basedir}/web-app/WEB-INF"
ant.move file:"${pluginBasedir}/grails-app/conf/log4j.dtd", todir:"${basedir}/web-app/WEB-INF"
ant.move file:"${pluginBasedir}/grails-app/conf/dwr.xml", todir:"${basedir}/web-app/WEB-INF"
ant.move file:"${pluginBasedir}/grails-app/conf/dwr20.dtd", todir:"${basedir}/web-app/WEB-INF"
ant.move (todir:"${basedir}/web-app", overwrite: true) {
			fileset dir:"${pluginBasedir}/web-app"
}		

updateConfig()

private void updateConfig() {
	def configFile = new File(basedir, 'grails-app/conf/Config.groovy')
	if (configFile.exists() && configFile.text.indexOf("chiba") == -1) {
		configFile.withWriterAppend {
			it.writeLine '\n// Added by the Grails Chiba Web plugin:'
			it.writeLine 'chiba.web.useragent="dojo" // "dojo" or "html"'
			it.writeLine 'chiba.web.xforms.filter.urlpatterns=["*.xhtml"]'
		}
ant.echo '''
************************************************************
* Your grails-app/conf/Config.groovy has been updated with *
* default configurations of Chiba Web;                     *
* please verify that the values are correct.               *
************************************************************
'''		
	}	
}