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
 
// Delete copied plugin related files
ant.delete file:"${basedir}/web-app/WEB-INF/chiba-config.xml"
ant.delete file:"${basedir}/web-app/WEB-INF/log4j.xml"
ant.delete file:"${basedir}/web-app/WEB-INF/log4j.dtd"
ant.delete file:"${basedir}/web-app/WEB-INF/dwr.xml"
ant.delete file:"${basedir}/web-app/WEB-INF/dwr20.dtd"

ant.delete file:"${basedir}/web-app/ChibaUserGuide.pdf"
ant.delete file:"${basedir}/web-app/CSSReference.pdf"
ant.delete file:"${basedir}/web-app/demo.html"
ant.delete file:"${basedir}/web-app/dojoBaseHTML.html"
ant.delete file:"${basedir}/web-app/index.html"
ant.delete file:"${basedir}/web-app/index.jsp"
ant.delete file:"${basedir}/web-app/login_error.jsp"
ant.delete file:"${basedir}/web-app/login.jsp"
ant.delete file:"${basedir}/web-app/results.html"
ant.delete file:"${basedir}/web-app/XFormsEmbed.html"
ant.delete dir:"${basedir}/web-app/forms"
ant.delete dir:"${basedir}/web-app/jsp"
ant.delete dir:"${basedir}/web-app/resources"