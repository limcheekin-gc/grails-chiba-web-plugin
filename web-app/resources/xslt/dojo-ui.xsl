<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xforms="http://www.w3.org/2002/xforms"
    xmlns:chiba="http://chiba.sourceforge.net/xforms"
    exclude-result-prefixes="xhtml xforms chiba">

    <!-- Copyright 2008 - Joern Turner, Lars Windauer
         Licensed under the terms of BSD and Apache 2 Licenses -->

    <!-- ####################################################################################################### -->
    <!-- This stylesheet handles the XForms UI constructs [XForms 1.0, Chapter 9]'group', 'repeat' and           -->
    <!-- 'switch' and offers some standard interpretations for the appearance attribute.                         -->
    <!-- author: joern turner                                                                                    -->
    <!-- ####################################################################################################### -->

    <xsl:param name="chiba-pseudo-item" select="'chiba-pseudo-item'"/>
    <!-- ############################################ PARAMS ################################################### -->
    <!-- ##### should be declared in html4.xsl ###### -->
    <!-- ############################################ VARIABLES ################################################ -->


    <xsl:output method="html" indent="yes"/>
    <xsl:preserve-space elements="*"/>

    <!-- ####################################################################################################### -->
    <!-- #################################### GROUPS ########################################################### -->
    <!-- ####################################################################################################### -->
<!--
    <xsl:template match="xforms:group[@appearance='chiba:outer-group']">
        <div dojoType="chiba.ui.container.OuterGroup">
            <script type="dojo/method" event="onLoad">
                console.debug("now or never");
            </script>

            <xsl:apply-templates />
        </div>

    </xsl:template>
-->


    <!-- ### DEFAULT GROUP - this is used if no @apprearance has been defined ### -->
    <xsl:template match="xforms:group">
        <xsl:variable name="group-id" select="@id"/>
        <xsl:variable name="group-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:call-template name="group-body-div">
            <xsl:with-param name="group-id" select="$group-id"/>
            <xsl:with-param name="group-classes" select="$group-classes"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template name="group-body-div">
        <xsl:param name="group-id"/>
        <xsl:param name="group-classes"/>
        <xsl:param name="group-label" select="true()"/>

        <div dojoType="chiba.ui.container.ContentPaneGroup" id="{$group-id}" class="{$group-classes}">
            <div>
                <xsl:choose>
                    <xsl:when test="$group-label and xforms:label">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($group-id, '-label')"/>
                        </xsl:attribute>
                        <xsl:attribute name="class">
                            <xsl:call-template name="assemble-group-label-classes"/>
                        </xsl:attribute>
                        <xsl:apply-templates select="xforms:label"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="style">display:none;</xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
            </div>

            <xsl:apply-templates select="*[not(self::xforms:label)]"/>
        </div>
    </xsl:template>

    <!-- this template is used for all groups with an appearance -->
    <xsl:template match="xforms:group[@appearance]" name="group">
        <xsl:variable name="group-id" select="@id"/>
        <xsl:variable name="group-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:call-template name="group-body">
            <xsl:with-param name="group-id" select="$group-id"/>
            <xsl:with-param name="group-classes" select="$group-classes"/>
        </xsl:call-template>
    </xsl:template>


    <xsl:template match="xforms:group[@appearance='titlePaneOpen']" >
        <xsl:variable name="group-id" select="@id"/>
        <xsl:variable name="group-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <div  id="{$group-id}"
              class="{$group-classes}"
              dojoType="chiba.ui.container.TitlePaneGroup"
              open="true"
              title="{xforms:label}">
            <xsl:apply-templates select="*[not(self::xforms:label)]"/>
        </div>
    </xsl:template>

    <xsl:template match="xforms:group[@appearance='titlePaneClosed']" >
        <xsl:variable name="group-id" select="@id"/>
        <xsl:variable name="group-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <div  id="{$group-id}"
              class="{$group-classes}"
              dojoType="chiba.ui.container.TitlePaneGroup"
              open="false"
              title="{xforms:label}">
            <xsl:apply-templates select="*[not(self::xforms:label)]"/>
        </div>
    </xsl:template>


    <xsl:template name="group-body">
        <xsl:param name="group-id"/>
        <xsl:param name="group-classes"/>
        <xsl:param name="group-label" select="true()"/>

        <div id="{$group-id}" class="{$group-classes}" dojoType="chiba.ui.container.Group">
            <div class="legend">
                <xsl:choose>
                    <xsl:when test="$group-label and xforms:label">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($group-id, '-label')"/>
                        </xsl:attribute>
                        <xsl:attribute name="class">
                            <xsl:call-template name="assemble-group-label-classes"/>
                        </xsl:attribute>
                        <xsl:apply-templates select="xforms:label"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="style">display:none;</xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
            </div>

            <xsl:apply-templates select="*[not(self::xforms:label)]"/>
        </div>
    </xsl:template>
    <xsl:template name="group-body-repeated">
        <xsl:param name="group-id"/>
        <xsl:param name="group-classes"/>
        <xsl:param name="group-label" select="true()"/>

        <div id="{$group-id}" class="{$group-classes}" xfControlType="{local-name()}">
            <div class="legend">
                <xsl:choose>
                    <xsl:when test="$group-label and xforms:label">
                        <xsl:attribute name="id">
                            <xsl:value-of select="concat($group-id, '-label')"/>
                        </xsl:attribute>
                        <xsl:attribute name="class">
                            <xsl:call-template name="assemble-group-label-classes"/>
                        </xsl:attribute>
                        <xsl:apply-templates select="xforms:label"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:attribute name="style">display:none;</xsl:attribute>
                    </xsl:otherwise>
                </xsl:choose>
            </div>

            <xsl:apply-templates select="*[not(self::xforms:label)]" mode="repeated-full"/>
        </div>
    </xsl:template>


    <!-- ######################################################################################################## -->
    <!-- ####################################### custom group with vertical layout ############################## -->
    <!-- ######################################################################################################## -->

    <xsl:template match="xforms:group[@appearance='ca:verticalTable']" priority="10">

<!--
        <xsl:if test="exists(xforms:group)">
            <xsl:message terminate="yes">ERROR: This custom group appearance may not have child groups</xsl:message>
        </xsl:if>
-->
        <table border="1" class="caVerticalTable">
            <tr>
                <td colspan="2" class="caVerticalTableHeader"><xsl:apply-templates select="./xforms:label"/></td>
            </tr>
                <!--<xsl:for-each select="*[position() &gt; 1 and position() &lt; last()]">-->
                <xsl:for-each select="*[position() &gt; 1]">
                    <tr>
                        <xsl:choose>
                            <xsl:when test="local-name()='group'">
                                <td colspan="2">
                                    <xsl:apply-templates select="."/>
                                </td>
                            </xsl:when>
                            <xsl:otherwise>
                                <td class="caVerticalTableLabel">
                                    <xsl:apply-templates select="xforms:label" />
                                </td>
                                <td class="caVerticalTableValue">
                                    <xsl:apply-templates select="." mode="table"/>
                                </td>
                            </xsl:otherwise>
                        </xsl:choose>
                    </tr>
                </xsl:for-each>
        </table>
    </xsl:template>


    <xsl:template match="xforms:input|xforms:range|xforms:secret|xforms:select|xforms:select1|xforms:textarea|xforms:upload" mode="table">
            <xsl:variable name="id" select="@id"/>
            <xsl:variable name="control-classes">
                <xsl:call-template name="assemble-control-classes">
                    <xsl:with-param name="appearance" select="@appearance"/>
                </xsl:call-template>
            </xsl:variable>

            <div id="{$id}"
                 dojoType="chiba.ui.Control"
                 class="{$control-classes}">
                <xsl:if test="@style">
                    <xsl:attribute name="style">
                        <xsl:value-of select="@style"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:call-template name="buildControl"/>
                <xsl:copy-of select="xhtml:script"/>
            </div>
    </xsl:template>
    <xsl:template match="chiba:data" mode="table" priority="10"/>

    <!-- ######################################################################################################## -->
    <!-- ####################################### custom group with vertical layout ############################## -->
    <!-- ######################################################################################################## -->


    <xsl:template match="xforms:group[@appearance='ca:horizontalTable']" priority="10">
<!--
        <xsl:if test="exists(xforms:group)">
            <xsl:message terminate="yes">ERROR: This custom group appearance may not have child groups</xsl:message>
        </xsl:if>
-->
        <table border="1" class="caHorizontalTable">
            <tr>
                <!--<td colspan="{count(*[position() &gt; 1 and position() &lt; last()])}" class="caHorizontalTableHeader">-->
                <td colspan="{count(*[position() &gt; 1])}" class="caHorizontalTableHeader">
                    <xsl:apply-templates select="./xforms:label"/>
                </td>
            </tr>
            <tr>
                <!--<xsl:for-each select="*[position() &gt; 1 and position() &lt; last()]/xforms:label">-->
                <xsl:for-each select="*[position() &gt; 1]/xforms:label">
                <td class="caHorizontalTableLabel">
                    <xsl:apply-templates select="." />
                </td>
                </xsl:for-each>
            </tr>
            <tr>
                <!--<xsl:for-each select="*[position() &gt; 1 and position() &lt; last()]">-->
                <xsl:for-each select="*[position() &gt; 1]">
                    <td class="caHorizontalTableValue">
                        <xsl:apply-templates select="." mode="table"/>
                    </td>
                </xsl:for-each>
            </tr>
        </table>
    </xsl:template>

    <xsl:template match="xforms:group[@appearance='ca:singleRowTable']" priority="10">
<!--
        <xsl:if test="exists(xforms:group)">
            <xsl:message terminate="yes">ERROR: This custom group appearance may not have child groups</xsl:message>
        </xsl:if>
-->
        <table border="1" class="caSingleRowTable">
            <tr>
                <!--<xsl:for-each select="*[position() &gt; 1 and position() &lt; last()]">-->
                <xsl:for-each select="*[not(local-name() = 'data')]">
                    <td class="caSingleTableValue">
                        <!--<xsl:value-of select="name()"/>-->
                        <!--<xsl:apply-templates select="./xforms:label" mode="table"/>-->
                        <!--<xsl:apply-templates select="." mode="table"/>-->
                        <xsl:apply-templates select="." />
                    </td>
                </xsl:for-each>
            </tr>
        </table>
    </xsl:template>

    <xsl:template match="chiba:data" priority="10"/>
    <!-- ######################################################################################################## -->
    <!-- ####################################### REPEAT ######################################################### -->
    <!-- ######################################################################################################## -->

<!--
    <xsl:template match="xforms:repeat[@appearance='dojo:grid']">
        <script type="text/javascript">
            dojo.addOnLoad(function() {
                var data = [
                    <xsl:for-each select="xforms:group[@appearance='repeated']">
                        [
                        <xsl:for-each select=".//chiba:data">
                                "<xsl:value-of select="."/>"<xsl:if test="position()!=last()">,</xsl:if>
                        </xsl:for-each>
                        ],
                    </xsl:for-each>
                 ];

                 // global var "model"
                 var model = new dojox.grid.data.Table(null, data);
                 var view1 = {
                         cells: [[
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']/*/xforms:label">
                                 {name: '<xsl:value-of select="."/>'}<xsl:if test="position()!=last()">,</xsl:if>
            </xsl:for-each>
                                ]]
                 };
                 var layout = [ view1 ];
                // Now set the model and structure
                gridWidget.setModel(model);
                gridWidget.setStructure(layout);
            });
        </script>
        <div id="grid" dojoType="dojox.Grid" jsId="gridWidget"></div>
    </xsl:template>
-->


	<!-- ### MINIMAL REPEAT ### -->
<!--
    <xsl:template match="xforms:repeat[@appearance='minimal']" name="minimal-repeat">
        <xsl:variable name="repeat-id" select="@id"/>
        <xsl:variable name="repeat-index" select="chiba:data/@chiba:index"/>
        <xsl:variable name="repeat-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'minimal'"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:if test="not(ancestor::xforms:repeat)">
            -->
<!-- generate prototype(s) for scripted environment -->
<!--
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']">
                <xsl:call-template name="processMinimalPrototype">
                    <xsl:with-param name="id" select="$repeat-id"/>
                </xsl:call-template>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:repeat">
                <xsl:call-template name="processRepeatPrototype"/>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:itemset">
                <xsl:call-template name="processItemsetPrototype"/>
            </xsl:for-each>
        </xsl:if>

        <div id="{$repeat-id}" class="{$repeat-classes}">
            -->
<!-- loop repeat entries -->
<!--
            <xsl:for-each select="xforms:group[@appearance='repeated']">
                <xsl:variable name="repeat-item-classes">
                    <xsl:call-template name="assemble-repeat-item-classes">
                        <xsl:with-param name="selected" select="$repeat-index=position()"/>
                    </xsl:call-template>
                </xsl:variable>

                <div id="{@id}" class="{$repeat-item-classes}">
                    <xsl:apply-templates/>
                </div>
            </xsl:for-each>
        </div>
        <xsl:if test="not(ancestor::xforms:repeat)">
            -->
<!-- register index event handler -->
<!--
            <xsl:variable name="function-name" select="concat('register', generate-id())"/>
-->
<!--
            <script type="text/javascript">
                dojo.event.connect(dojo.byId("<xsl:value-of select="$repeat-id"/>"),"onclick",setRepeatIndex);
            </script>
-->
<!--
        </xsl:if>
    </xsl:template>
-->

    <!-- prototype for minimal repeat -->
    <xsl:template name="processMinimalPrototype">
        <xsl:param name="id"/>

        <div id="{$id}-prototype" class="xfRepeatPrototype xfDisabled xfReadWrite xfOptional xfValid" style="display:none;">
            <xsl:apply-templates/>
        </div>
    </xsl:template>


    <!-- ### COMPACT REPEAT ### -->
    <xsl:template match="xforms:repeat[@appearance='compact']" name="compact-repeat">
        <xsl:variable name="repeat-id" select="@id"/>
        <xsl:variable name="repeat-index" select="chiba:data/@chiba:index"/>
        <xsl:variable name="repeat-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'compact'"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:if test="not(ancestor::xforms:repeat)">
            <!-- generate prototype(s) for scripted environment -->
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']">
                <xsl:call-template name="processCompactPrototype">
                    <xsl:with-param name="id" select="$repeat-id"/>
                    <xsl:with-param name="appearance" select="'compact'"/>
                </xsl:call-template>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:repeat">
                <xsl:call-template name="processRepeatPrototype"/>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:itemset">
                <xsl:call-template name="processItemsetPrototype"/>
            </xsl:for-each>
        </xsl:if>

        <table repeatId="{$repeat-id}"
               jsId="{$repeat-id}"
               class="{$repeat-classes}"
               dojoType="chiba.ui.container.Repeat"
               appearance="compact"
               border="0"
               cellpadding="0"
               cellspacing="0"
               >
            <!-- build table header -->
            <xsl:for-each select="xforms:group[@appearance='repeated'][1]">
                <tr class="xfRepeatHeader">
                    <xsl:call-template name="processCompactHeader"/>
                    <td></td>
                </tr>
            </xsl:for-each>

            <!-- loop repeat entries -->
            <xsl:for-each select="xforms:group[@appearance='repeated']">
                <xsl:variable name="id" select="@id"/>
                <xsl:variable name="repeat-item-classes">
                    <xsl:call-template name="assemble-repeat-item-classes">
                        <xsl:with-param name="selected" select="$repeat-index=position()"/>
                    </xsl:call-template>
                </xsl:variable>

                <tr repeatItemId="{$id}"
                    class="{$repeat-item-classes}"
                    dojoType="chiba.ui.container.RepeatItem"
                    appearance="compact">
                    <xsl:call-template name="processCompactChildren"/>
                    <xsl:if test="../@appearance='ca:compact'">
                        <td width="30px;">
                            <div class="caRepeatActionDock">
                                <div class="xfRepeatItemControl" showLabel="false">
                                </div>
                            </div>
                        </td>
                    </xsl:if>
                    <!--
                    <td class="caRepeatActionDock">
-->
<!--
                        <div dojoType="dijit.form.ComboButton" showlabel="false">
                            <div dojoType="dijit.Menu" toggle="fade" style="display:none;width:100%;">
                                <div dojoType="dijit.MenuItem" iconClass="caInsertBeforeMouseOut" onclick="fluxProcessor.dispatch('insertBefore');">insert before</div>
                                <div dojoType="dijit.MenuItem" iconClass="caDeleteMouseOut" onclick="fluxProcessor.dispatch('deleteCurrent');">delete current</div>
                                <div dojoType="dijit.MenuItem" iconClass="caInsertAfterMouseOut" onclick="fluxProcessor.dispatch('insertAfter');">insert after</div>
                            </div>
                        </div>
-->
<!--
                        <div dojoType="dijit.form.DropDownButton" showLabel="false">
                            <div dojotype="dijit.TooltipDialog">
                                <div class="caInsertBeforeMouseOut" alt="insert an item above"
                                     onclick="fluxProcessor.dispatch('insertBefore');"
                                        tabindex="0">
                                 </div>
                                <div alt="delete current item" class="caDeleteMouseOut"
                                    onclick="fluxProcessor.dispatch('deleteCurrent');"
                                        tabindex="0">
                                 </div>
                                <div alt="insert an item below" class="caInsertAfterMouseOut"
                                    onclick="fluxProcessor.dispatch('insertAfter');"
                                        tabindex="0">
                                </div>
                            </div>
                        </div>
                    </td>
-->
                </tr>
            </xsl:for-each>
        </table>
        <xsl:if test="not(ancestor::xforms:repeat)">
            <!-- register index event handler -->
            <!--<xsl:variable name="function-name" select="concat('register', generate-id())"/>-->

<!--
            <script type="text/javascript">
                dojo.connect(dojo.byId("<xsl:value-of select="$repeat-id"/>"),"onclick",setRepeatIndex);
            </script>
-->
        </xsl:if>
    </xsl:template>

    <!-- header for compact repeat -->
    <xsl:template name="processCompactHeader">
        <xsl:for-each select="xforms:*">
            <xsl:variable name="col-classes">
                <xsl:choose>
                    <xsl:when test="./chiba:data/@chiba:enabled='false'"><xsl:value-of select="concat('col-',position(),' ','xfDisabled')"/></xsl:when>
                    <xsl:otherwise><xsl:value-of select="concat('col-',position())"/></xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <td class="{$col-classes}">
                <xsl:choose>
                    <xsl:when test="self::xforms:*[local-name(.)='trigger' or local-name(.)='submit' or (local-name(.)='output' and @appearance='caLink')][xforms:label]">
                        <xsl:variable name="label-classes">
                            <xsl:call-template name="assemble-label-classes"/>
                        </xsl:variable>
                        <label id="{@id}-label-header" class="{$label-classes}">
                            <xsl:value-of select="xforms:label/@header"/>
                        </label>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:variable name="label-classes">
                            <xsl:call-template name="assemble-label-classes"/>
                        </xsl:variable>

                        <label id="{@id}-label" class="{$label-classes}">
                            <xsl:apply-templates select="xforms:label"/>
                        </label>
                    </xsl:otherwise>
                </xsl:choose>
            </td>
        </xsl:for-each>
    </xsl:template>

    <!-- prototype for compact repeat -->
    <xsl:template name="processCompactPrototype">
        <xsl:param name="id"/>
        <xsl:param name="appearance"/>

        <table style="display:none;">
            <tr id="{$id}-prototype" class="xfRepeatPrototype xfDisabled xfReadWrite xfOptional xfValid">
                <xsl:for-each select="xforms:*">
                    <xsl:variable name="col-classes">
                        <xsl:choose>
                            <xsl:when test="./chiba:data/@chiba:enabled='false'">
                                <xsl:value-of select="concat('col-',position(),' ','xfDisabled')"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="concat('col-',position())"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>

                    <td valign="top" class="{$col-classes}">
                        <xsl:apply-templates select="." mode="repeated"/>

                    </td>
                </xsl:for-each>
                <xsl:if test="../@appearance='ca:compact'">
                <td width="30px;">
                    <div class="caRepeatActionDock">
                        <div class="xfRepeatItemControl" showLabel="false">
                        </div>
                    </div>
                </td>
                </xsl:if>

            </tr>
        </table>
    </xsl:template>

    <!-- overridden control template for compact repeat -->
    <xsl:template match="xforms:input|xforms:output|xforms:range|xforms:secret|xforms:select|xforms:select1|xforms:textarea|xforms:upload" mode="repeated">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes"/>
        </xsl:variable>
        <div id="{$id}" class="{$control-classes} xfRepeated" xfControlType="{local-name()}" dojoAttachEvent='onfocus:_onFocus' appearance="{@appearance}">
            <xsl:choose>
                <xsl:when test="'select' = local-name()">
<!--
                    <div id="{$id}" class="{$control-classes} xfRepeated" xfControlType="{local-name()}" dojoAttachEvent='onfocus:_onFocus'>
-->
                        <xsl:call-template name="select"/>
                        <xsl:apply-templates select="xforms:alert"/>
<!--
                    </div>
-->
                </xsl:when>
                <xsl:when test="'select1' = local-name()">
                            <xsl:call-template name="select1"/>
                            <xsl:apply-templates select="xforms:alert"/>
                </xsl:when>
            </xsl:choose>
        </div>
    </xsl:template>
    <xsl:template match="xforms:trigger" mode="repeated">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes"/>
        </xsl:variable>
        <div id="{$id}" class="{$control-classes} xfRepeated" xfControlType="{local-name()}" appearance="{@appearance}" dojoAttachEvent='onfocus:_onFocus' ><xsl:value-of select="xforms:label"/></div>
    </xsl:template>


    <xsl:template match="xforms:input|xforms:output|xforms:range|xforms:secret|xforms:select|xforms:select1|xforms:textarea|xforms:upload" mode="repeated-full">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes"/>
        </xsl:variable>

        <div id="{$id}" class="{$control-classes} xfRepeated" xfControlType="{local-name()}" appearance="{@appearance}" dojoAttachEvent='onfocus:_onFocus' >
            <label class="xfLabel"><xsl:apply-templates select="xforms:label"/></label>
        </div>

    </xsl:template>


    <!-- children for compact repeat -->
    <xsl:template name="processCompactChildren">
        <xsl:for-each select="xforms:*">
            <xsl:variable name="col-classes">
                <xsl:choose>
                    <xsl:when test="./chiba:data/@chiba:enabled='false'"><xsl:value-of select="concat('col-',position(),' ','xfDisabled')"/></xsl:when>
                    <xsl:otherwise><xsl:value-of select="concat('col-',position())"/></xsl:otherwise>
                </xsl:choose>
            </xsl:variable>

            <td valign="top" class="{$col-classes}">
                <xsl:apply-templates select="." mode="compact-repeat"/>
           </td>
        </xsl:for-each>
    </xsl:template>

    <!-- overridden control template for compact repeat -->
    <xsl:template match="xforms:input|xforms:output|xforms:range|xforms:secret|xforms:select|xforms:select1|xforms:textarea|xforms:upload" mode="compact-repeat">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes"/>
        </xsl:variable>

        <div id="{$id}" class="{$control-classes} xfRepeated" dojoType="chiba.ui.Control"  dojoAttachEvent='onfocus:_onFocus' >
            <!--<div id="{concat($id,'-inline')}" dojoType="chiba.ui.InlineEditBox" editor="chiba.ui.input.TextField" class="value" value="{chiba:data/text()}"/>-->
            <!--<div onclick="switchToEdit(this);" id="{concat($id,'-value')}" class="value"><xsl:value-of select="chiba:data/text()"/></div>-->
<!--
            <xsl:variable name="label-classes">
                <xsl:call-template name="assemble-label-classes"/>
            </xsl:variable>
-->

            <label for="{$id}-value" id="{$id}-label" style="display:none">
                <xsl:apply-templates select="xforms:label"/>
            </label>

            <xsl:call-template name="buildControl"/>
        </div>
    </xsl:template>

    <!-- overridden group template for compact repeat -->
    <xsl:template match="xforms:group" mode="compact-repeat">
        <xsl:variable name="group-id" select="@id"/>
        <xsl:variable name="group-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:call-template name="group-body">
            <xsl:with-param name="group-id" select="$group-id"/>
            <xsl:with-param name="group-classes" select="$group-classes"/>
            <xsl:with-param name="group-label" select="false()"/>
        </xsl:call-template>
    </xsl:template>

    <!-- default templates for compact repeat -->
    <xsl:template match="xforms:*" mode="compact-repeat">
        <xsl:apply-templates select="."/>
    </xsl:template>


    <!-- ### FULL REPEAT ### -->
    <xsl:template match="xforms:repeat[@appearance='full']" name="full-repeat">
        <xsl:variable name="repeat-id" select="@id"/>
        <xsl:variable name="repeat-index" select="chiba:data/@chiba:index"/>
        <xsl:variable name="repeat-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'full'"/>
            </xsl:call-template>
        </xsl:variable>

        <xsl:if test="not(ancestor::xforms:repeat)">
            <!-- generate prototype(s) for scripted environment -->
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']">
                <xsl:call-template name="processFullPrototype">
                    <xsl:with-param name="id" select="$repeat-id"/>
                </xsl:call-template>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:repeat">
                <xsl:call-template name="processRepeatPrototype"/>
            </xsl:for-each>
            <xsl:for-each select="chiba:data/xforms:group[@appearance='repeated']//xforms:itemset">
                <xsl:call-template name="processItemsetPrototype"/>
            </xsl:for-each>
        </xsl:if>

        <div repeatId="{$repeat-id}" class="{$repeat-classes}" dojoType="chiba.ui.container.Repeat">
            <!-- loop repeat entries -->
            <xsl:for-each select="xforms:group[@appearance='repeated']">
                <xsl:variable name="repeat-item-id" select="@id"/>
                <xsl:variable name="repeat-item-classes">
                    <xsl:call-template name="assemble-repeat-item-classes">
                        <xsl:with-param name="selected" select="$repeat-index=position()"/>
                    </xsl:call-template>
                </xsl:variable>

                    <xsl:variable name="group-label" select="true()"/>

                    <div repeatItemId="{$repeat-item-id}"
                         class="{$repeat-item-classes}"
                         dojoType="chiba.ui.container.RepeatItem"
                         appearance="full">
                        <div class="legend">
                            <xsl:choose>
                                <xsl:when test="$group-label and xforms:label">
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="concat($repeat-item-id, '-label')"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="class">
                                        <xsl:call-template name="assemble-group-label-classes"/>
                                    </xsl:attribute>
                                    <xsl:apply-templates select="xforms:label"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="style">display:none;</xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                        </div>

                        <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                    </div>

            </xsl:for-each>
        </div>
        <xsl:if test="not(ancestor::xforms:repeat)">
            <!-- register index event handler -->
            <!--<xsl:variable name="function-name" select="concat('register', generate-id())"/>-->
<!--
            <script type="text/javascript">
                dojo.event.connect(dojo.byId("<xsl:value-of select="$repeat-id"/>"),"onclick",setRepeatIndex);
            </script>
-->
        </xsl:if>
    </xsl:template>

    <!-- prototype for full repeat -->
    <xsl:template name="processFullPrototype">
        <xsl:param name="id"/>

        <xsl:call-template name="group-body-repeated">
            <xsl:with-param name="group-id" select="concat($id, '-prototype')"/>
            <xsl:with-param name="group-classes" select="'repeat-prototype xfDisabled xfReadWrite xfOptional xfValid'"/>
        </xsl:call-template>
    </xsl:template>


    <!-- ### DEFAULT REPEAT ### -->
    <xsl:template match="xforms:repeat" name="repeat">
        <!-- compact appearance as default -->
        <xsl:call-template name="full-repeat"/>
    </xsl:template>

    <!-- ### FOREIGN NAMESPACE REPEAT ### -->
    <xsl:template match="*[@xforms:repeat-bind]|*[@xforms:repeat-nodeset]|@repeat-bind|@repeat-nodeset" name="generic-repeat">
        <xsl:variable name="repeat-index" select="chiba:data/@chiba:index"/>
        <xsl:variable name="repeat-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'full'"/>
            </xsl:call-template>
        </xsl:variable>


         <xsl:element name="{local-name(.)}" namespace="">
             <xsl:copy-of select="@*"/>

             <xsl:for-each select="xforms:group[@appearance='repeated']">
                 <xsl:variable name="repeat-item-id" select="@id"/>
                 <xsl:variable name="repeat-item-classes">
                     <xsl:call-template name="assemble-repeat-item-classes">
                         <xsl:with-param name="selected" select="$repeat-index=position()"/>
                     </xsl:call-template>
                 </xsl:variable>

                 <xsl:for-each select="*">
                     <xsl:apply-templates select="." mode="repeated"/>
                 </xsl:for-each>
             </xsl:for-each>
         </xsl:element>

    </xsl:template>


    <!--

       <xsl:variable name="repeat-id" select="@id"/>
        <xsl:variable name="repeat-index" select="chiba:data/@chiba:index"/>
        <xsl:variable name="repeat-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'full'"/>
            </xsl:call-template>
        </xsl:variable>


        <div repeatItemId="{$repeat-id}" class="{$repeat-classes}" dojoType="chiba.ui.container.Repeat">
            <xsl:for-each select="xforms:group[@appearance='repeated']">
                <xsl:variable name="repeat-item-id" select="@id"/>
                <xsl:variable name="repeat-item-classes">
                    <xsl:call-template name="assemble-repeat-item-classes">
                        <xsl:with-param name="selected" select="$repeat-index=position()"/>
                    </xsl:call-template>
                </xsl:variable>

                    <xsl:variable name="group-label" select="true()"/>

                    <div repeatItemId="{$repeat-item-id}"
                         class="{$repeat-item-classes}"
                         dojoType="chiba.ui.container.RepeatItem"
                         appearance="full">
                        <div class="legend">
                            <xsl:choose>
                                <xsl:when test="$group-label and xforms:label">
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="concat($repeat-item-id, '-label')"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="class">
                                        <xsl:call-template name="assemble-group-label-classes"/>
                                    </xsl:attribute>
                                    <xsl:apply-templates select="xforms:label"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="style">display:none;</xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                        </div>

                        <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                    </div>

            </xsl:for-each>
        </div>
        <xsl:if test="not(ancestor::xforms:repeat)">
            <xsl:variable name="function-name" select="concat('register', generate-id())"/>
        </xsl:if>

    -->


    <!-- repeat prototype helper -->
    <xsl:template name="processRepeatPrototype">
        <xsl:variable name="id" select="@id"/>

        <xsl:choose>
            <xsl:when test="@appearance='full'">
                <xsl:call-template name="processFullPrototype">
                    <xsl:with-param name="id" select="$id"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="@appearance='compact'">
                <xsl:call-template name="processCompactPrototype">
                    <xsl:with-param name="id" select="$id"/>
                    <xsl:with-param name="appearance" select="@appearance"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="processMinimalPrototype">
                    <xsl:with-param name="id" select="$id"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- itemset prototype helper -->
    <xsl:template name="processItemsetPrototype">
        <xsl:variable name="item-id" select="$chiba-pseudo-item"/>
        <xsl:variable name="itemset-id" select="@id"/>
        <xsl:variable name="name" select="concat($data-prefix,../@id)"/>
        <xsl:variable name="parent" select=".."/>

        <xsl:choose>
            <xsl:when test="local-name($parent)='select1' and $parent/@appearance='full'">
                <xsl:call-template name="build-radiobutton-prototype">
                    <xsl:with-param name="item-id" select="$item-id"/>
                    <xsl:with-param name="itemset-id" select="$itemset-id"/>
                    <xsl:with-param name="name" select="$name"/>
                    <xsl:with-param name="parent" select="$parent"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="local-name($parent)='select' and $parent/@appearance='full'">
                <xsl:call-template name="build-checkbox-prototype">
                    <xsl:with-param name="item-id" select="$item-id"/>
                    <xsl:with-param name="itemset-id" select="$itemset-id"/>
                    <xsl:with-param name="name" select="$name"/>
                    <xsl:with-param name="parent" select="$parent"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="build-item-prototype">
                    <xsl:with-param name="item-id" select="$item-id"/>
                    <xsl:with-param name="itemset-id" select="$itemset-id"/>
                </xsl:call-template>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- ######################################################################################################## -->
    <!-- ####################################### SWITCH ######################################################### -->
    <!-- ######################################################################################################## -->

    <!-- ### FULL SWITCH ### -->
    <!--
        Renders a tabsheet. This template requires that the author sticks to an
        authoring convention: The triggers for toggling the different cases MUST
        all appear in a case with id 'switch-toggles'. This convention makes it
        easier to maintain the switch cause all relevant markup is kept under the
        same root element.
    -->
<!--
    <xsl:template match="xforms:switch[@appearance='full']" name="full-switch">
        <xsl:variable name="switch-id" select="@id"/>
        <xsl:variable name="switch-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="'full'"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="selected-id" select="xforms:case[chiba:data/@chiba:selected='true']/@id"/>

        <table id="{$switch-id}" class="{$switch-classes}">
            <tr>
                <xsl:for-each select="xforms:case[@id='switch-toggles']/xforms:trigger">
                    <xsl:variable name="case-id" select=".//xforms:toggle/@xforms:case | .//xforms:toggle/@case"/>
                    <xsl:choose>
                        <xsl:when test="$case-id=$selected-id">
                            <td id="{concat($case-id, '-tab')}" class="caActiveTab">
                                <xsl:call-template name="trigger"/>
                            </td>
                        </xsl:when>
                        <xsl:otherwise>
                            <td id="{concat($case-id, '-tab')}" class="caInactiveTab">
                                <xsl:call-template name="trigger"/>
                            </td>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:for-each>
                <td class="caFillerTab">
                    <xsl:value-of select="'&amp;nbsp;'" disable-output-escaping="yes"/>
                </td>
            </tr>
            <tr>
                <td colspan="{count(xforms:case[@id='switch-toggles']/xforms:trigger) + 1}" class="xfFullSwitchBody">
                    <xsl:apply-templates select="xforms:case[not(@id='switch-toggles')]"/>
                </td>
            </tr>
        </table>
    </xsl:template>
-->

    <!-- ### DEFAULT SWITCH ### -->
    <xsl:template match="xforms:switch">
        <xsl:variable name="switch-id" select="@id"/>
        <xsl:variable name="switch-classes">
            <xsl:call-template name="assemble-compound-classes">
                <xsl:with-param name="appearance" select="@appearance"/>
            </xsl:call-template>
        </xsl:variable>

        <div id="{$switch-id}" class="{$switch-classes}" dojoType="chiba.ui.container.Switch">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <!-- ### SELECTED CASE ### -->
    <xsl:template match="xforms:case[chiba:data/@chiba:selected='true']" name="selected-case">
        <xsl:variable name="case-id" select="@id"/>
        <xsl:variable name="case-classes" select="'xfCase xfSelectedCase'"/>

        <div id="{$case-id}" class="{$case-classes}">
            <xsl:apply-templates select="*[not(self::xforms:label)]" />
        </div>
    </xsl:template>

    <!-- ### DE-SELECTED/NON-SELECTED CASE ### -->
    <xsl:template match="xforms:case" name="deselected-case">
        <!-- render only in scripted environment -->
        <xsl:variable name="case-id" select="@id"/>
        <xsl:variable name="case-classes" select="'xfCase xfDeselectedCase'"/>

        <div id="{$case-id}" class="{$case-classes}">
            <xsl:apply-templates select="*[not(self::xforms:label)]" />
        </div>
    </xsl:template>


	<xsl:template match="xforms:switch[@appearance='dijit:AccordionContainer']">
		<xsl:variable name="switch-id" select="@id"/>
		<xsl:variable name="switch-classes">
		    <xsl:call-template name="assemble-compound-classes">
		        <xsl:with-param name="appearance" select="@appearance"/>
		    </xsl:call-template>
		</xsl:variable>

		<div id="{$switch-id}" class="{$switch-classes}" dojoType="dijit.layout.AccordionContainer" duration="200"
                style="float: left; margin-right: 30px; width: 400px; height: 300px; overflow: hidden">
			<xsl:for-each select="xforms:case[.//xforms:label]">
				<div dojoType="dijit.layout.AccordionPane" selected="{@selected}" title="{.//xforms:label[1]}">
                    <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                </div>
			</xsl:for-each>
		</div>
	</xsl:template>

	<xsl:template match="xforms:switch[@appearance='chiba:AccordionContainer']">
		<xsl:variable name="switch-id" select="@id"/>
		<xsl:variable name="switch-classes">
		    <xsl:call-template name="assemble-compound-classes">
		        <xsl:with-param name="appearance" select="@appearance"/>
		    </xsl:call-template>
		</xsl:variable>
        <div style="display:none">
            <xsl:for-each select="xforms:case[@name='switch-toggles']/xforms:trigger">
                <xsl:call-template name="trigger"/>
            </xsl:for-each>
        </div>
        <div id="{$switch-id}" class="{$switch-classes} xfAccordion" dojoType="chiba.ui.container.AccordionSwitch" duration="200" >
<!--
		<div id="{$switch-id}" class="{$switch-classes}" dojoType="chiba.ui.container.TabSwitch"
                style="width: 900px; height: 400px;">
-->
			<xsl:for-each select="xforms:case[./xforms:label]">
                <xsl:variable name="selected">
                    <xsl:choose>
                        <xsl:when test="@selected='true'">true</xsl:when>
                        <xsl:otherwise>false</xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <div dojoType="chiba.ui.container.AccordionSwitchPane" class="xfCase" caseId="{@id}" selected="{$selected}" title="{xforms:label}">
                    <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                </div>
			</xsl:for-each>
		</div>
	</xsl:template>

    <xsl:template match="xforms:switch[@appearance='dijit:TabContainer']">
		<xsl:variable name="switch-id" select="@id"/>
		<xsl:variable name="switch-classes">
		    <xsl:call-template name="assemble-compound-classes">
		        <xsl:with-param name="appearance" select="@appearance"/>
		    </xsl:call-template>
		</xsl:variable>
        <div style="display:none">
            <xsl:for-each select="xforms:case[@name='switch-toggles']/xforms:trigger">
                <xsl:call-template name="trigger"/>
            </xsl:for-each>
        </div>
		<div id="{$switch-id}" class="{$switch-classes} caTabContainer" dojoType="chiba.ui.container.TabSwitch" >
			<xsl:for-each select="xforms:case[./xforms:label]">
                <xsl:variable name="selected">
                    <xsl:choose>
                        <xsl:when test="@selected='true'">true</xsl:when>
                        <xsl:otherwise>false</xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <div dojoType="dijit.layout.ContentPane" class="xfCase" caseId="{@id}" selected="{$selected}" title="{xforms:label}">
                    <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                </div>
			</xsl:for-each>
		</div>
	</xsl:template>

	<xsl:template match="xforms:switch[@appearance='dijit:TitlePane']">
		<xsl:variable name="switch-id" select="@id"/>
		<xsl:variable name="switch-classes">
		    <xsl:call-template name="assemble-compound-classes">
		        <xsl:with-param name="appearance" select="@appearance"/>
		    </xsl:call-template>
		</xsl:variable>

		<div id="{$switch-id}" class="{$switch-classes}"
                style="width: 600px; height: 300px;">
            <xsl:for-each select="xforms:case[.//xforms:label]">
                <div dojoType="chiba.ui.container.TitlePaneGroup" title="{.//xforms:label[1]}">
                    <xsl:apply-templates select="*[not(self::xforms:label)]"/>
                </div>
            </xsl:for-each>
        </div>
	</xsl:template>

</xsl:stylesheet>

