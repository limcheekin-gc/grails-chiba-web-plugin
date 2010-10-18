<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xf="http://www.w3.org/2002/xforms"
                xmlns:chiba="http://chiba.sourceforge.net/xforms"
                exclude-result-prefixes="xhtml xf chiba">

    <!-- Copyright 2008 - Joern Turner, Lars Windauer
         Licensed under the terms of BSD and Apache 2 Licenses -->

    <xsl:import href="common.xsl"/>
    <xsl:include href="dojo-ui.xsl"/>
    <xsl:include href="dojo-controls.xsl"/>


    <!-- ####################################################################################################### -->
    <!-- This stylesheet transcodes a XTHML2/XForms input document to HTML 4.0.                                  -->
    <!-- It serves as a reference for customized stylesheets which may import it to overwrite specific templates -->
    <!-- or completely replace it.                                                                               -->
    <!-- This is the most basic transformator for HTML browser clients and assumes support for HTML 4 tagset     -->
    <!-- but does NOT rely on javascript.                                                                        -->
    <!-- author: joern turner                                                                                    -->
    <!-- ####################################################################################################### -->

    <!-- ############################################ PARAMS ################################################### -->
    <xsl:param name="contextroot" select="''"/>

    <xsl:param name="sessionKey" select="''"/>

    <!-- ### this url will be used to build the form action attribute ### -->
    <xsl:param name="action-url" select="'http://localhost:8080/chiba-1.0.0/XFormsServlet'"/>

    <xsl:param name="form-id" select="'chibaform'"/>
    <xsl:param name="form-name" select="//xhtml:title"/>
    <xsl:param name="debug-enabled" select="'false'"/>

    <!-- ### specifies the parameter prefix for repeat selectors ### -->
    <xsl:param name="selector-prefix" select="'s_'"/>

    <!-- ### contains the full user-agent string as received from the servlet ### -->
    <xsl:param name="user-agent" select="'default'"/>

    <!--- path to javascript files -->
    <xsl:param name="scriptPath" select="''"/>

    <!-- path to core CSS file -->
    <xsl:param name="CSSPath" select="''"/>

    <xsl:param name="keepalive-pulse" select="'0'"/>

    <!-- CDN support is disabled by default -->
    <xsl:param name="useCDN" select="'false'"/>

    <!-- ############################################ VARIABLES ################################################ -->
    <!-- ### checks, whether this form uses uploads. Used to set form enctype attribute ### -->
    <xsl:variable name="uses-upload" select="boolean(//*/xf:upload)"/>

    <!-- ### checks, whether this form makes use of date types and needs datecontrol support ### -->
    <!-- this is only an interims solution until Schema type and base type handling has been clarified -->
    <xsl:variable name="uses-dates">
        <xsl:choose>
            <xsl:when test="boolean(//chiba:data/chiba:type='date')">true()</xsl:when>
            <xsl:when test="boolean(//chiba:data/chiba:type='dateTime')">true()</xsl:when>
            <xsl:when test="boolean(substring-after(//chiba:data/chiba:type,':') ='date')">true()</xsl:when>
            <xsl:when test="boolean(substring-after(//chiba:data/chiba:type,':') ='dateTime')">true()</xsl:when>
            <xsl:otherwise>false()</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <!-- ### checks, whether this form makes use of <textarea xf:mediatype='text/html'/> ### -->
    <xsl:variable name="uses-html-textarea" select="boolean(//xf:textarea[@mediatype='text/html'])"/>

    <!-- ### the CSS stylesheet to use ### -->
    <xsl:variable name="default-css" select="concat($contextroot,$CSSPath,'xforms.css')"/>
    <xsl:variable name="chiba-css" select="concat($contextroot,$CSSPath,'chiba.css')"/>

    <xsl:variable name="default-hint-appearance" select="'bubble'"/>



    <xsl:output method="html" version="4.01" encoding="UTF-8" indent="yes"
                doctype-public="-//W3C//DTD HTML 4.01 Transitional//EN"
                doctype-system="http://www.w3.org/TR/html4/loose.dtd"/>
    <!-- ### transcodes the XHMTL namespaced elements to HTML ### -->
    <!--<xsl:namespace-alias stylesheet-prefix="xhtml" result-prefix="#default"/>-->

    <xsl:preserve-space elements="*"/>
    <xsl:strip-space elements="xf:action"/>

    <!-- ####################################################################################################### -->
    <!-- ##################################### TEMPLATES ####################################################### -->
    <!-- ####################################################################################################### -->

    <xsl:template match="xhtml:head">
        <head>
            <!-- copy all meta tags except 'contenttype' -->
            <xsl:call-template name="getMeta"/>

            <title>
                <xsl:value-of select="$form-name"/>
            </title>

            <!-- copy base if present -->
            <xsl:if test="xhtml:base">
                <base>
                    <xsl:attribute name="href">
                        <xsl:value-of select="xhtml:base/@href"/>
                    </xsl:attribute>
                </base>
            </xsl:if>

            <xsl:choose>
                <xsl:when test="$useCDN='true'">
                    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.2/dojo/resources/dojo.css"/>
                    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.2/dijit/themes/tundra/tundra.css"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="addDojoCSS"/>
                </xsl:otherwise>
            </xsl:choose>

            <!-- include Chiba default stylesheet -->
            <link rel="stylesheet" type="text/css" href="{$default-css}"/>
            <link rel="stylesheet" type="text/css" href="{$chiba-css}"/>

            <!-- copy user-defined stylesheets and inline styles -->
            <xsl:call-template name="getLinkAndStyle"/>

            <!-- include needed javascript files -->
            <xsl:call-template name="addDojoConfig"/>
            <xsl:call-template name="addDojoImport"/>
            <xsl:call-template name="addDWRImports"/>

            <!-- Optional Simile Timeline Javascript Imports -->
            <xsl:if test="exists(//xf:input[@appearance='caSimileTimeline'])">
                <xsl:call-template name="addSimileTimelineImports" />
            </xsl:if>

            <xsl:call-template name="copyInlineScript"/>
            <script type="text/javascript">
                <xsl:call-template name="addDojoRequires"/>

                <xsl:if test="$debug-enabled">
                    function getXFormsDOM(){
                        Flux.getXFormsDOM(document.getElementById("chibaSessionKey").value,
                            function(data){
                                console.dirxml(data);
                            }
                        );
                    }

                    function getInstanceDocument(instanceId){
                        var model = dojo.query(".xfModel", dojo.doc)[0];
                        dijit.byId(dojo.attr(model, "id")).getInstanceDocument(instanceId,
                            function(data){
                                console.dirxml(data);
                            });
                    }
                </xsl:if>

<!--
                function switchToEdit(target){
                    //console.debug("target,"target);
                    new chiba.ui.input.TextField({id:target.id,value:dojo.byId(target.id).innerHTML},target.id)

                }
-->

                var hideLoader = function(){
                    dojo.fadeOut({
                        node:"fluxProcessor",
                        duration:400,
                        onEnd: function(){
                            dojo.style("fluxProcessor", "display", "none");
                            dojo.style(dojo.body(),"overflow","auto");
                        }
                    }).play();
                }

                dojo.addOnLoad(function(){

                    dojo.addOnLoad(function(){
                        dojo.parser.parse();
                        hideLoader();
                        Flux.init(dojo.attr(dojo.byId("fluxProcessor"),"sessionKey"),dijit.byId("fluxProcessor").applyChanges);                        
                    });
                });
            </script><xsl:text>
</xsl:text>

        </head>
    </xsl:template>


    <xsl:template name="addDojoCSS"><xsl:text>
</xsl:text>
                <style type="text/css">
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/release/dojo/dijit/themes/tundra/tundra.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/release/dojo/dojo/resources/dojo.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/release/dojo/dojox/widget/Toaster/Toaster.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojox/layout/resources/FloatingPane.css";
	                @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojox/layout/resources/ResizeHandle.css";
                    
                </style><xsl:text>
</xsl:text>
    </xsl:template>

    <xsl:template name="addDojoConfig">
        <xsl:choose>
            <xsl:when test="$useCDN='true'">
                <script type="text/javascript">
                    var djConfig = {
                    debugAtAllCost:<xsl:value-of select="$debug-enabled"/>,
                    isDebug:<xsl:value-of select="$debug-enabled"/>,
                    baseUrl:"<xsl:value-of select="concat($contextroot,$scriptPath,'release/dojo/')"/>",
                    modulePaths:{"chiba":"chiba"},
                    xWaitSeconds:10,
                    parseOnLoad:false
                    };
                </script><xsl:text>
</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <script type="text/javascript" src="{concat($contextroot,$scriptPath,'release/dojo/dojo/dojo.js')}">
                    var djConfig = {
                        debugAtAllCost:<xsl:value-of select="$debug-enabled"/>,
                        isDebug:<xsl:value-of select="$debug-enabled"/>,
                        parseOnLoad:false
                    };
                </script><xsl:text>
</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="addDojoImport">
        <xsl:choose>
            <xsl:when test="$useCDN='true'">
                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/dojo/1.2/dojo/dojo.xd.js"> </script><xsl:text>
</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <script type="text/javascript" src="{concat($contextroot,$scriptPath,'release/dojo/dojo/dojo.js')}"> </script><xsl:text>
</xsl:text>
            </xsl:otherwise>
        </xsl:choose>

        <script type="text/javascript" src="{concat($contextroot,$scriptPath,'release/dojo/chiba/chiba.js')}">
            &#160;</script>
        <xsl:text>
</xsl:text>
    </xsl:template>

    <!-- todo: move this template out to e.g. 'dojoPlus.xsl' -->
    <xsl:template name="addSimileTimelineImports" >
            <script type="text/javascript" src="{concat($contextroot,$scriptPath, 'simile/timeline/simile-ajax-api.js')}">&#160;</script><xsl:text>
</xsl:text>
            <script type="text/javascript" src="{concat($contextroot,$scriptPath, 'simile/timeline/simile-ajax-bundle.js')}">&#160;</script><xsl:text>
</xsl:text>
            <script type="text/javascript" src="{concat($contextroot,$scriptPath, 'simile/timeline/timeline-api.js?timeline-use-local-resources=true&amp;bundle=true&amp;forceLocale=en')}">&#160;</script><xsl:text>
</xsl:text>
    </xsl:template>

    <xsl:template match="xhtml:body">
        <!-- todo: add 'overflow:hidden' to @style here -->
        <body class="tundra">
            <xsl:copy-of select="@*"/>
            <div id="caLoading" class="disabled">
                <img src="{concat($contextroot,'/resources/images/indicator.gif')}" class="xfDisabled" id="indicator"
                     alt="loading"/>
            </div>
            <noscript>
                <div id="noScript">
                    Sorry, you don't have Javascript enabled in your browser. Click here for a non-scripted version
                    of this form.
                </div>
            </noscript>

            <div dojotype="chiba.FluxProcessor" jsId="fluxProcessor" id="fluxProcessor" sessionkey="{$sessionKey}"/>

            <xsl:for-each select="//xf:model">
                <div class="xfModel" style="display:none" id="{@id}" jsId="{@id}" dojoType="chiba.XFormsModelElement"/>
             </xsl:for-each>

             <xsl:variable name="outermostNodeset"
                          select=".//xf:*[not(xf:model)][not(ancestor::xf:*)]"/>

            <!-- detect how many outermost XForms elements we have in the body -->
            <xsl:choose>
                <xsl:when test="count($outermostNodeset) = 1">
                    <!-- match any body content and defer creation of form tag for XForms processing.
                     This option allows to mix HTML forms with XForms markup. -->
                    <!-- todo: issue to revisit: this obviously does not work in case there's only one xforms control in the document. In that case the necessary form tag is not written. -->
                    <!-- hack solution: add an output that you style invisible to the form to make it work again. -->
                    <xsl:apply-templates mode="inline"/>
                </xsl:when>
                <xsl:otherwise>
                    <!-- in case there are multiple outermost xforms elements we are forced to create
                     the form tag for the XForms processing.-->
                    <xsl:call-template name="createForm"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="exists(//xf:help)">
                <div id="helpTrigger">
                    <a href="javascript:fluxProcessor.showHelp();">Help</a>
                </div>                
            </xsl:if>
            <div id="helpWindow" style="display:none"/>
            <div id="caCopyright">
                <xsl:text disable-output-escaping="yes">powered by Chiba, &amp;copy; 2001-2009</xsl:text>
            </div>

            <xsl:if test="$debug-enabled='true'">
                <div id="debug-pane" style="width:100%;border:thin dotted;">
                    <button dojotype="dijit.form.Button" onclick="getXFormsDOM();">
                        <label>HostDOM</label>
                    </button>
                    <xsl:for-each select="//xf:instance">
                        <button dojotype="dijit.form.Button" onclick="getInstanceDocument(this.id);" id="{@id}">
                            <label>Instance:<xsl:value-of select="if(position()=1) then concat(@id,' (default)') else @id"/></label>
                        </button>
                    </xsl:for-each>
                </div>
            </xsl:if>
            <!-- Toaster widget for ephemeral messages -->
            <div dojoType="dojox.widget.Toaster"
                 id="chibaMessageToaster"
                 positionDirection="br-left"
                 duration="3000"
                 separator="&lt;div style='height:1px;border-top:thin dotted;width:100%;'&gt;&lt;/div&gt;"
                 messageTopic="testMessageTopic">
            </div>
        </body>
    </xsl:template>

    <!--
    match outermost group of XForms markup. An outermost group is necessary to allow standard HTML forms
    to coexist with XForms markup and still produce non-nested form tags in the output.
    -->
    <xsl:template
            match="xf:group[not(ancestor::xf:*)][1] | xf:repeat[not(ancestor::xf:*)][1] | xf:switch[not(ancestor::xf:*)][1]"
            mode="inline">
        <!-- ##### the XFormsProcessor itself is always reachable via id 'fluxProcessor' ##### -->
        <xsl:element name="form">
            <xsl:call-template name="createFormAttributes"/>
            <xsl:apply-templates select="."/>
        </xsl:element>
    </xsl:template>

    <!-- this template is called when there's no single outermost XForms element meaning there are
     several blocks of XForms markup scattered in the body of the host document. -->
    <xsl:template name="createForm">
        <!-- ##### the XFormsProcessor itself is always reachable via id 'fluxProcessor' ##### -->
        <!--<div dojotype="chiba.FluxProcessor" jsId="fluxProcessor" id="fluxProcessor" sessionkey="{$sessionKey}"/>-->
        <xsl:element name="form">
            <xsl:call-template name="createFormAttributes"/>
            <xsl:for-each select="*">
                <xsl:apply-templates select="."/>
            </xsl:for-each>
        </xsl:element>
    </xsl:template>

    <xsl:template name="createFormAttributes">
        <xsl:attribute name="name">
            <xsl:value-of select="$form-id"/>
        </xsl:attribute>

        <xsl:attribute name="onSubmit">return submitFunction();</xsl:attribute>
        <xsl:attribute name="method">POST</xsl:attribute>

        <xsl:choose>
            <xsl:when test="$uses-upload = false">
                <xsl:attribute name="enctype">application/x-www-form-urlencoded</xsl:attribute>
                <xsl:attribute name="action">javascript:submitFunction();</xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
                <xsl:attribute name="enctype">multipart/form-data</xsl:attribute>
                <xsl:attribute name="action">
                    <xsl:value-of select="concat($action-url,'?sessionKey=',$sessionKey,'&#38;isUpload=true')"/>
                </xsl:attribute>
                <input type="hidden" name="isUpload" value=""/>
                <iframe id="UploadTarget" name="UploadTarget" src="" style="width:0px;height:0px;border:0"></iframe>
            </xsl:otherwise>
        </xsl:choose>
        <input type="hidden" id="chibaSessionKey" name="sessionKey" value="{$sessionKey}"/>
    </xsl:template>
    <!-- ######################################################################################################## -->
    <!-- #####################################  CONTROLS ######################################################## -->
    <!-- ######################################################################################################## -->

    <!-- todo: restructure to use a mode to build the widget instead of buildControl -->
    <xsl:template match="xf:input|xf:range|xf:secret|xf:select|xf:select1|xf:textarea|xf:upload">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="label-classes">
            <xsl:call-template name="assemble-label-classes"/>
        </xsl:variable>

        <div id="{$id}"
             dojoType="chiba.ui.Control"
             class="{$control-classes}">
            <xsl:if test="@style">
                <xsl:attribute name="style">
                    <xsl:value-of select="@style"/>
                </xsl:attribute>
            </xsl:if>
            <label for="{$id}-value" id="{$id}-label" class="{$label-classes}">
                <xsl:apply-templates select="xf:label"/>
            </label>
            <xsl:call-template name="buildControl"/>
            <xsl:copy-of select="xhtml:script"/>
        </div>
    </xsl:template>

    <!-- cause outputs can be inline they should not use a block element wrapper -->
    <xsl:template match="xf:output">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="label-classes">
            <xsl:call-template name="assemble-label-classes"/>
        </xsl:variable>

        <span id="{$id}" class="{$control-classes}" dojoType="chiba.ui.Control">
            <label for="{$id}-value" id="{$id}-label" class="{$label-classes}">
                <xsl:apply-templates select="xf:label"/>
            </label>
            <xsl:call-template name="buildControl"/>
            <xsl:copy-of select="xhtml:script"/>
        </span>
    </xsl:template>

    <xsl:template match="xf:trigger|xf:submit">
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:call-template name="trigger">
            <xsl:with-param name="classes" select="$control-classes"/>
        </xsl:call-template>
    </xsl:template>

    <!-- ######################################################################################################## -->
    <!-- #####################################  CHILD ELEMENTS ################################################## -->
    <!-- ######################################################################################################## -->

    <!-- ### handle label ### -->
    <xsl:template match="xf:label">
        <!-- match all inline markup and content -->
        <xsl:apply-templates/>

        <!-- check for requiredness -->
        <!--<xsl:if test="../chiba:data/@chiba:required='true'">-->
            <!--<span class="xfRequiredSymbol">*</span>-->
        <!--</xsl:if>-->
    </xsl:template>

    <!-- ### handle help ### -->
    <!-- ### only reacts on help elements with a 'src' attribute and interprets it as html href ### -->
    <xsl:template match="xf:help">

        <div id="{../@id}-help" style="display:none"><xsl:value-of select="."/></div>
    </xsl:template>

    <!-- ### handle explicitely enabled alert ### -->
    <!--    <xsl:template match="xf:alert[../chiba:data/@chiba:valid='false']">-->
    <xsl:template match="xf:alert">
        <span id="{../@id}-alert" class="xfAlert" style="display:none;">
            <xsl:value-of select="."/>
        </span>
    </xsl:template>

    <!-- ####################################################################################################### -->
    <!-- #####################################  HELPER TEMPLATES '############################################## -->
    <!-- ####################################################################################################### -->

    <xsl:template name="buildControl">
        <xsl:apply-templates select="xf:help"/>

        <xsl:variable name="id" select="@id"/>

        <xsl:variable name="datatype">
            <xsl:call-template name="getType"/>
        </xsl:variable>
        <xsl:variable name="lname" select="local-name()"/>
        <xsl:variable name="name" select="concat($data-prefix,@id)"/>
        <xsl:variable name="incremental" select="if (exists(@incremental)) then @incremental else 'false'"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="accesskey" select="if (exists(@accesskey)) then @accesskey else 'none'"/>

        <xsl:choose>
            <xsl:when test="$lname='input' or
                            $lname='output' or
                            $lname='secret' or
                            $lname='submit' or
                            $lname='trigger' or
                            $lname='textarea' or
                            $lname='upload'">

                <div id="{concat($id,'-value')}"
                     class="xfValue"
                     dataType="{$datatype}"
                     controlType="{$lname}"
                     appearance="{@appearance}"
                     name="{$name}"
                     incremental="{$incremental}"
                     tabindex="{$navindex}"
                     title="{xf:hint}">

                    <xsl:if test="$accesskey != ' none'">
                        <xsl:attribute name="accessKey"><xsl:value-of select="$accesskey"/></xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@mediatype">
                        <xsl:attribute name="mediatype">
                            <xsl:value-of select="@mediatype"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="@appearance='caOPMLTree' or @appearance='caSimileTimeline'" >
                        <xsl:message select="@ref"/>
                        <xsl:variable name="tmpInstanceId1"><xsl:value-of select="substring(@ref,11,string-length(@ref))"/></xsl:variable>
                        <xsl:variable name="tmpInstanceId2"><xsl:value-of select="substring-before($tmpInstanceId1,')')"/></xsl:variable>
                        <xsl:variable name="instanceId"><xsl:value-of select="substring($tmpInstanceId2,1,string-length($tmpInstanceId2)-1)"/></xsl:variable>
                        <xsl:variable name="modelId"><xsl:value-of select="//xf:model[//xf:instance/@id=$instanceId]/@id"/></xsl:variable>

                        <xsl:attribute name="instanceId"><xsl:value-of select="$instanceId" /></xsl:attribute>
                        <xsl:attribute name="modelId"><xsl:value-of select="$modelId" /></xsl:attribute>

                    </xsl:if>

                    <xsl:choose>
                        <xsl:when test="contains(@mediatype,'text/html')">
                            <xsl:attribute name="tabindex" select="-1"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="tabindex" select="$navindex"/>
                        </xsl:otherwise>
                    </xsl:choose>

                    <xsl:if test="$datatype !='string'">
                        <xsl:attribute name="schemaValue">
                            <xsl:value-of select="chiba:data/@chiba:schema-value"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:if test="$lname='upload'">
                        <xsl:attribute name="fileId">
                            <xsl:value-of select="xf:filename/@id"/>
                        </xsl:attribute>
                        <xsl:attribute name="fileValue">
                            <xsl:value-of select="xf:filename/chiba:data"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:choose>
                        <xsl:when test="contains(@mediatype,'text/html')">
                            <xsl:value-of select="chiba:data/text()" disable-output-escaping="yes"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:copy-of select="chiba:data/text()"/>
                        </xsl:otherwise>
                    </xsl:choose>

                </div>
                <!--<div style="display:none;" id="{concat($id,'-hint')}"><xsl:value-of select="xf:hint"/></div>-->
                <xsl:apply-templates select="xf:alert"/>
            </xsl:when>
            <xsl:when test="local-name()='range'">
                <xsl:variable name="value" select="chiba:data/text()"/>
                <xsl:variable name="start" select="@start"/>
                <xsl:variable name="end" select="@end"/>
                <xsl:variable name="step" select="@step"/>
                <xsl:variable name="appearance" select="@appearance"/>

                <div id="{concat(@id,'-value')}"
                     class="xfValue"
                     dataType="{$datatype}"
                     controlType="{local-name()}"
                     appearance="{$appearance}"
                     name="{$name}"
                     incremental="{$incremental}"
                     tabindex="{$navindex}"
                     start="{$start}"
                     end="{$end}"
                     step="{$step}"
                     value="{chiba:data/text()}"
                     title="{xf:hint}">
                    <xsl:if test="$accesskey != ' none'">
                        <xsl:attribute name="accessKey"><xsl:value-of select="$accesskey"/></xsl:attribute>
                    </xsl:if>

<!--
                    <ol dojoType="dijit.form.HorizontalRuleLabels" container="topDecoration"
                        style="height:1em;font-size:75%;color:gray;">
                        <xsl:if test="$start">
                            <li><xsl:value-of select="$start"/></li>
                            <li> </li>
                        </xsl:if>
                        <xsl:if test="$end">
                            <li><xsl:value-of select="$end"/></li>
                        </xsl:if>
                    </ol>
-->

                </div>
                <div style="display:none;" id="{concat($id,'-hint')}"><xsl:value-of select="xf:hint"/></div>
                <xsl:apply-templates select="xf:alert"/>
            </xsl:when>
            <xsl:when test="local-name()='select'">
                <xsl:call-template name="select"/>
                <xsl:apply-templates select="xf:alert"/>
            </xsl:when>
            <xsl:when test="local-name()='select1'">
                <xsl:call-template name="select1"/>
                <xsl:apply-templates select="xf:alert"/>
            </xsl:when>
            <xsl:when test="local-name()='repeat'">
                <xsl:apply-templates select="."/>
            </xsl:when>
            <xsl:when test="local-name()='group'">
                <xsl:apply-templates select="."/>
                <xsl:apply-templates select="xf:alert"/>
            </xsl:when>
            <xsl:when test="local-name()='switch'">
                <xsl:apply-templates select="."/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>