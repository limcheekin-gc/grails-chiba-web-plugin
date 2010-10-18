<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xforms="http://www.w3.org/2002/xforms"
                xmlns:chiba="http://chiba.sourceforge.net/xforms"
                exclude-result-prefixes="chiba xforms xsl">

    <xsl:variable name="data-prefix" select="'d_'"/>
    <xsl:variable name="trigger-prefix" select="'t_'"/>
    <xsl:variable name="remove-upload-prefix" select="'ru_'"/>

    <!-- Copyright 2008 - Joern Turner, Lars Windauer
         Licensed under the terms of BSD and Apache 2 Licenses -->
    
    <!-- change this to your ShowAttachmentServlet -->

    <!-- This stylesheet contains a collection of templates which map XForms controls to HTML controls. -->
    <xsl:output method="html" version="4.01" indent="yes"/>


    <!-- ######################################################################################################## -->
    <!-- This stylesheet serves as a 'library' for HTML form controls. It contains only named templates and may   -->
    <!-- be re-used in different layout-stylesheets to create the naked controls.                                 -->
    <!-- ######################################################################################################## -->



    <xsl:template name="input">
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="incremental" select="if(exists(@incremental)) then @incremental else 'false'"/>
        <xsl:variable name="name" select="concat($data-prefix,$id)"/>

        <xsl:variable name="type">
            <xsl:call-template name="getType"/>
        </xsl:variable>

        <xsl:choose>
            <xsl:when test="($type='date' or $type='dateTime' or $type='time')">
                 <div   id="{$id}-value"
                        widgetId="{$id}-value"
                        name="{$name}"
                        value="{chiba:data/@chiba:schema-value}"
                        class="xfValue"
                        dojotype="chiba.ui.input.Date">
                     <xsl:if test="string-length($navindex) != 0">
                         <xsl:attribute name="tabindex">
                             <xsl:value-of select="$navindex"/>
                         </xsl:attribute>
                     </xsl:if>
                     <xsl:apply-templates select="xforms:hint"/>
                 </div>
            </xsl:when>
            <xsl:when test="$type='boolean'">
                <div id="{$id}-value"
                     type="checkbox"
                     name="{$name}"
                     class="xfValue"
                     widgetId="{$id}-value"
                     dojoType="chiba.ui.input.Boolean"
                     checked="{chiba:data/text()}">
                    <xsl:if test="string-length($navindex) != 0">
                        <xsl:attribute name="tabindex">
                            <xsl:value-of select="$navindex"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="xforms:hint"/>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div    id="{concat($id,'-value')}"
                        dojotype="chiba.ui.input.TextField"
                        value="{chiba:data/text()}"
                        class="xfValue"
                        type="text">
                    <xsl:if test="string-length($navindex) != 0">
                        <xsl:attribute name="tabindex">
                            <xsl:value-of select="$navindex"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="xforms:hint"/>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- build output -->
    <xsl:template name="output">

        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:choose>
            <xsl:when test="contains(@mediatype,'image/')">
                <xsl:element name="img">
                    <xsl:attribute name="dojoType">chiba.ui.output.Image</xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat($id,'-value')"/>
                    </xsl:attribute>
                    <xsl:attribute name="src">
                        <xsl:value-of select="chiba:data/text()"/>
                    </xsl:attribute>
                    <xsl:attribute name="alt">
                        <xsl:value-of select="xforms:label"/>
                    </xsl:attribute>
                    <xsl:apply-templates select="xforms:hint"/>
                </xsl:element>
            </xsl:when>
            <xsl:when test="contains(@mediatype,'text/html')">
                <xsl:element name="span">
                    <xsl:attribute name="dojoType">chiba.ui.output.Html</xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat($id,'-value')"/>
                    </xsl:attribute>
                    <xsl:attribute name="class">
                        <xsl:value-of select="'xfMediatypeTextHtml'"/>
                    </xsl:attribute>
                    <xsl:apply-templates select="xforms:hint"/>
                    <xsl:value-of select="chiba:data/text()" disable-output-escaping="yes"/>
                </xsl:element>

            </xsl:when>
            <xsl:when test="chiba:data[@chiba:type='anyURI'] and (not(@mediatype))">
                <!-- SIDOC/CNAF : sidoc-infra-204, implementation de l'approche Dojo -->
                <xsl:element name="a">
                   <xsl:if test="string-length($navindex) != 0">
                     <xsl:attribute name="tabindex"><xsl:value-of select="$navindex"/></xsl:attribute>
                   </xsl:if>

                    <!-- SIDOC/CNAF : sidoc-infra-204, implementation de l'approche Dojo -->
                    <xsl:attribute name="dojoType">chiba.ui.output.Link</xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat($id,'-value')"/>
                    </xsl:attribute>
                    <xsl:attribute name="href">
                        <xsl:value-of select="chiba:data/text()"/>
                    </xsl:attribute>
                    <xsl:apply-templates select="xforms:hint"/>
                    <xsl:value-of select="chiba:data/text()"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <span id="{concat($id,'-value')}"
                     dojoType="chiba.ui.output.Plain">
                     <xsl:apply-templates select="xforms:hint"/>
                    <xsl:value-of select="chiba:data/text()"/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- build range -->
    <xsl:template name="range">
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="start" select="@start"/>
        <xsl:variable name="end" select="@end"/>
        <xsl:variable name="step" select="@step"/>
        <xsl:variable name="showInput">
            <xsl:choose>
                <xsl:when test="@appearance='full'">true</xsl:when>
                <xsl:otherwise>false</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="value" select="chiba:data/text()"/>
        <xsl:choose>
            <xsl:when test="@appearance='chiba:rating'">
                <div  id="{$id}-value"
                      class="xfValue"
                      dojoType="chiba.ui.range.Rating"
                      value="{$value}"
                      numStars="{$end}">
                    <xsl:if test="chiba:data/@chiba:readonly='true'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>

                    <xsl:apply-templates select="xforms:hint"/>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div  id="{$id}-value"
                      class="xfValue"
                      dojoType="chiba.ui.range.Slider"
                      value="{$value}"
                      minimum="{$start}"
                      maximum="{$end}"
                      intermediateChanges="false"
                      discreteValues="{(($end - $start) div $step) +1}"
                      style="height:1em;font-size:75%;color:gray;">

                    <xsl:if test="chiba:data/@chiba:readonly='true'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>

                    <xsl:apply-templates select="xforms:hint"/>

                    <div dojoType="dijit.form.HorizontalRule" container="topDecoration" style="height:5px;" count="{(($end - $start) div $step) +1}"></div>
                </div>
            </xsl:otherwise>
        </xsl:choose>
        <!--</div>-->
    </xsl:template>

    <!-- *** fallback template for representing range as a combobox in non-scripted mode *** -->
    <xsl:template name="drawRangeBasic">
        <xsl:param name="rangeId"/>
        <xsl:param name="value"/>
        <xsl:param name="current"/>
        <xsl:param name="step"/>
        <xsl:param name="end"/>

        <xsl:if test="$current &lt;= $end">
            <option id="{$rangeId}-value" value="{$current}" title="{xforms:hint}" class="xfSelectorItem">
                <xsl:if test="$value = $current">
                    <xsl:attribute name="selected">selected</xsl:attribute>
                </xsl:if>
                <xsl:value-of select="$current"/>
            </option>
        </xsl:if>

        <xsl:variable name="newStep" select="$current + $step"/>
        <xsl:if test="$newStep &lt;= $end">
            <xsl:call-template name="drawRangeBasic">
                <xsl:with-param name="rangeId" select="$rangeId"/>
                <xsl:with-param name="value" select="$value"/>
                <xsl:with-param name="current" select="$newStep"/>
                <xsl:with-param name="step" select="$step"/>
                <xsl:with-param name="end" select="$end"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

    <!-- build secret control -->
    <xsl:template name="secret">
        <xsl:param name="maxlength"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="incremental" select="if (exists(@incremental)) then @incremental else 'false'"/>
        <xsl:element name="input">
            <xsl:if test="string-length($navindex) != 0">
                <xsl:attribute name="tabindex">
                    <xsl:value-of select="$navindex"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="id">
                <xsl:value-of select="concat($id,'-value')"/>
            </xsl:attribute>
            <xsl:attribute name="dojoType">chiba.ui.secret.Secret</xsl:attribute>
            <xsl:attribute name="name">
                <xsl:value-of select="concat($data-prefix,$id)"/>
            </xsl:attribute>
            <xsl:attribute name="class">value</xsl:attribute>
            <xsl:attribute name="type">password</xsl:attribute>
            <xsl:attribute name="value">
                <xsl:value-of select="chiba:data/text()"/>
            </xsl:attribute>
            <xsl:if test="$maxlength">
                <xsl:attribute name="maxlength">
                    <xsl:value-of select="$maxlength"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="chiba:data/@chiba:readonly='true'">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="$incremental='true'">
                    <xsl:attribute name="onkeyup">setXFormsValue(this);</xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="onkeyup">return keepAlive(this);</xsl:attribute>
                    <xsl:attribute name="onchange">setXFormsValue(this);</xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:attribute name="onkeydown">DWRUtil.onReturn(event, submitFunction);</xsl:attribute>
            <xsl:apply-templates select="xforms:hint"/>
        </xsl:element>
    </xsl:template>


    <xsl:template name="select1">
        <xsl:variable name="schemaValue" select="chiba:data/@chiba:schema-value"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="name" select="concat($data-prefix,$id)"/>
        <xsl:variable name="parent" select="."/>
        <xsl:variable name="incremental" select="if (exists(@incremental)) then @incremental else 'true'"/>
        <xsl:variable name="handler">
            <xsl:choose>
                <xsl:when test="$incremental='false'">onblur</xsl:when>
                <xsl:otherwise>onchange</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="size">
            <xsl:choose>
                <xsl:when test="@size"><xsl:value-of select="@size"/></xsl:when>
                <xsl:otherwise>5</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="datatype"><xsl:call-template name="getType"/></xsl:variable>

        <xsl:choose>
            <xsl:when test="@appearance='compact'">
                <select id="{concat($id,'-value')}"
                        name="{$name}"
                        size="{$size}"
                        dataType="{$datatype}"
                        controlType="select1List"
                        class="xfValue"
                        title="{xforms:hint}"
                        tabindex="{$navindex}"
                        schemaValue="{chiba:data/@chiba:schema-value}"
                        incremental="{$incremental}">
                    <xsl:apply-templates select="xforms:hint"/>
                    <xsl:call-template name="build-items">
                        <xsl:with-param name="parent" select="$parent"/>
                    </xsl:call-template>
                </select>
                <!-- handle itemset prototype -->
                <xsl:if test="not(ancestor::xforms:repeat)">
                    <xsl:for-each select="xforms:itemset/chiba:data/xforms:item">
                        <xsl:call-template name="build-item-prototype">
                            <xsl:with-param name="item-id" select="@id"/>
                            <xsl:with-param name="itemset-id" select="../../@id"/>
                        </xsl:call-template>
                    </xsl:for-each>
                </xsl:if>

            </xsl:when>
            <xsl:when test="@appearance='full'">
                <div id="{$id}-value"
                      controlType="select1RadioButton"
                      class="xfValue"                      
                      incremental="{$incremental}">
                    <xsl:call-template name="build-radiobuttons">
                        <xsl:with-param name="id" select="$id"/>
                        <xsl:with-param name="name" select="$name"/>
                        <xsl:with-param name="parent" select="$parent"/>
                        <xsl:with-param name="navindex" select="$navindex"/>
                    </xsl:call-template>
                </div>
                    <!-- handle itemset prototype -->
                    <xsl:if test="not(ancestor::xforms:repeat)">
                        <xsl:for-each select="xforms:itemset/chiba:data/xforms:item">
                            <xsl:call-template name="build-radiobutton-prototype">
                                <xsl:with-param name="item-id" select="@id"/>
                                <xsl:with-param name="itemset-id" select="../../@id"/>
                                <xsl:with-param name="name" select="$name"/>
                                <xsl:with-param name="parent" select="$parent"/>
                                <xsl:with-param name="navindex" select="$navindex"/>
                            </xsl:call-template>
                        </xsl:for-each>
                    </xsl:if>

                <!-- create hidden parameter for identification and deselection -->
            </xsl:when>
            <xsl:otherwise>
                <!-- No appearance or appearance='minimal'-->
                <xsl:choose>
                    <!-- Open Selection -->
                    <xsl:when test="@selection='open'">
                        <select id="{concat($id,'-value')}"
                                name="{$name}"
                                class="xfValue"
                                size="1"
                                dataType="{$datatype}"
                                controlType="select1ComboBoxOpen"
                                title="{xforms:hint}"
                                tabindex="{$navindex}"
                                schemaValue="{chiba:data/@chiba:schema-value}"
                                autocomplete="true"
                                incremental="{$incremental}">
                            <xsl:call-template name="build-items">
                                <xsl:with-param name="parent" select="$parent"/>
                            </xsl:call-template>
                        </select>
                    </xsl:when>
                    <!-- Standard Minimal Select -->
                    <xsl:otherwise>
                        <select id="{$id}-value"
                                name="{$name}"
                                class="xfValue"
                                dataType="{$datatype}"
                                controlType="select1ComboBox"
                                title="{xforms:hint}"
                                tabindex="{$navindex}"
                                schemaValue="{chiba:data/@chiba:schema-value}"
                                incremental="{$incremental}">
                            <xsl:call-template name="build-items">
                                <xsl:with-param name="parent" select="$parent"/>
                            </xsl:call-template>
                        </select>
                    </xsl:otherwise>
                </xsl:choose>


            <!-- former Chiba Select appearance = minimal version create data structure for selection list -->
            <!--
                <xsl:element name="select">
                    <xsl:if test="string-length($navindex) != 0">
                        <xsl:attribute name="tabindex">
                            <xsl:value-of select="$navindex"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:attribute name="id">
                        <xsl:value-of select="concat($id,'-value')"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="$name"/>
                    </xsl:attribute>
                    <xsl:attribute name="style">display: none;</xsl:attribute>
                    <xsl:attribute name="size">1</xsl:attribute>
                    <xsl:attribute name="class">value</xsl:attribute>
                    <xsl:if test="chiba:data/@chiba:readonly='true'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="$scripted='true'">
                        <xsl:attribute name="{$handler}">setXFormsValue(this);</xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select="xforms:hint"/>
                    <xsl:call-template name="build-items">
                        <xsl:with-param name="parent" select="$parent"/>
                    </xsl:call-template>
                </xsl:element>
                -->
                <!-- handle itemset prototype -->
                <!--
                <xsl:if test="$scripted='true' and not(ancestor::xforms:repeat)">
                    <xsl:for-each select="xforms:itemset/chiba:data/xforms:item">
                        <xsl:call-template name="build-item-prototype">
                            <xsl:with-param name="item-id" select="@id"/>
                            <xsl:with-param name="itemset-id" select="../../@id"/>
                        </xsl:call-template>
                    </xsl:for-each>
                </xsl:if>
                -->
                <!-- create hidden parameter for deselection -->
                <!--
                <input type="hidden" name="{$name}" value=""/>

                -->
                <!-- create the  selectionlist that is shown to the user: the CLONE -->
                <!--
                <xsl:variable name="original_id" select="concat($id, '-value')"/>
                <xsl:variable name="clone_id" select="concat('clone-', $original_id)"/>
                <xsl:element name="select">
                    <xsl:attribute name="id"><xsl:value-of select="$clone_id"/></xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="$name"/>
                    </xsl:attribute>
                    <xsl:attribute name="size">1</xsl:attribute>
                    <xsl:attribute name="class">value</xsl:attribute>
                    <xsl:if test="chiba:data/@chiba:readonly='true'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="$scripted='true'">
                        <xsl:attribute name="{$handler}">updateSelectionOfOriginal('<xsl:value-of select="$original_id"/>', '<xsl:value-of select="$clone_id"/>');</xsl:attribute>
                    </xsl:if>
                </xsl:element>
                <script type="text/javascript">
                	initializeClone('<xsl:value-of select="$original_id"/>', '<xsl:value-of select="$clone_id"/>');
                </script>
            -->
        </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <xsl:template name="select">
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="name" select="concat($data-prefix,$id)"/>
        <xsl:variable name="parent" select="."/>
        <xsl:variable name="incremental" select="if (exists(@incremental)) then @incremental else 'true'"/>
        <xsl:variable name="schemaValue" select="chiba:data/@chiba:schema-value"/>
        <xsl:variable name="datatype"><xsl:call-template name="getType"/></xsl:variable>
        <xsl:choose>
            <!-- only 'full' is supported as explicit case and renders a group of checkboxes. All other values
            of appearance will be matched and represented as a list control. -->
            <xsl:when test="@appearance='full'">
                <span id="{$parent/@id}-value"
                      name="{$name}"
                      class="xfValue CheckBoxGroup"
                      controlType="selectCheckBox"
                      dataType="{$datatype}"
                      title="{xforms:hint}"
                      schemaValue="{chiba:data/@chiba:schema-value}"
                      incremental="{$incremental}">
                    <xsl:for-each select="$parent/xforms:item|$parent/xforms:choices|$parent/xforms:itemset">
                        <xsl:call-template name="build-checkboxes-list">
                            <xsl:with-param name="name" select="$name"/>
                            <xsl:with-param name="parent" select="$parent"/>
                        </xsl:call-template>
                    </xsl:for-each>
                </span>
                <!-- handle itemset prototype -->
                <xsl:if test="not(ancestor::xforms:repeat)">
                    <xsl:for-each select="xforms:itemset/chiba:data/xforms:item">
                        <xsl:call-template name="build-checkbox-prototype">
                            <xsl:with-param name="item-id" select="@id"/>
                            <xsl:with-param name="itemset-id" select="../../@id"/>
                            <xsl:with-param name="name" select="$name"/>
                            <xsl:with-param name="parent" select="$parent"/>
                        </xsl:call-template>
                    </xsl:for-each>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <select id="{concat($id,'-value')}"
                        name="{$name}"
                        size="{@size}"
                        multiple="true"
                        controlType="selectList"
                        dataType="{$datatype}"
                        class="xfValue"
                        title="{xforms:hint}"
                        tabindex="{$navindex}"
                        schemaValue="{chiba:data/@chiba:schema-value}"
                        incremental="{$incremental}">
                    <xsl:call-template name="build-items">
                        <xsl:with-param name="parent" select="$parent"/>
                    </xsl:call-template>
                </select>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>


    <!-- build textarea control -->
    <xsl:template name="textarea">
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="incremental" select="if (exists(@incremental)) then @incremental else 'false'"/>

        <xsl:variable name="html-mediatype-class">
            <xsl:choose>
                <xsl:when test="@mediatype='text/html'"><xsl:text> </xsl:text>mediatype-text-html</xsl:when><xsl:otherwise/>
            </xsl:choose>
        </xsl:variable>

        <xsl:variable name="dojoType">
            <xsl:choose>
                <xsl:when test="@mediatype='dojo'">chiba.ui.textarea.Textarea</xsl:when>
                <xsl:when test="@mediatype='html' or @mediatype='text/html'">chiba.ui.textarea.HtmlEditor</xsl:when>
                <xsl:otherwise>chiba.ui.textarea.SimpleTextarea</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <div id="{$id}-value"
                  name="{concat($data-prefix,$id)}"
                  rows="5"
                  cols="30"
                  incremental="{$incremental}"                  
                  classType="{concat('value',$html-mediatype-class)}">
            <!-- Editor is rendered in iframe and does not work with tabindex -->
            <xsl:if test="@mediatype='html' or @mediatype='text/html'">
                <xsl:attribute name="tabindex" select="-1"/>
            </xsl:if>
            <xsl:apply-templates select="xforms:hint"/>
            <xsl:value-of select="chiba:data/text()"/>
        </div>
    </xsl:template>

    <!-- build submit -->
    <!-- todo: align with trigger template -->
    <xsl:template name="submit">
        <xsl:param name="classes"/>
        <!--<xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>-->
        <!--<xsl:variable name="id" select="@id"/>-->

<!--
        <span id="{$id}" class="{$classes}">
            <xsl:element name="input">
                <xsl:if test="string-length($navindex) != 0">
                    <xsl:attribute name="tabindex">
                        <xsl:value-of select="$navindex"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="id">
                    <xsl:value-of select="concat($id,'-value')"/>
                </xsl:attribute>
                <xsl:attribute name="type">button</xsl:attribute>
                <xsl:attribute name="onclick">activate(this);</xsl:attribute>
                <xsl:attribute name="name">
                    <xsl:value-of select="concat($trigger-prefix,$id)"/>
                </xsl:attribute>
                <xsl:attribute name="value">
                    <xsl:value-of select="xforms:label"/>
                </xsl:attribute>
                <xsl:if test="chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                -->
<!--            <xsl:if test="chiba:data/@chiba:enabled='false'">-->
<!--
                -->
<!--                <xsl:attribute name="disabled">true</xsl:attribute>-->
<!--
                -->
<!--            </xsl:if>-->
<!--
                <xsl:attribute name="class">value</xsl:attribute>
                <xsl:apply-templates select="xforms:hint"/>
            </xsl:element>
        </span>
-->
    </xsl:template>

    <!-- build trigger -->
    <xsl:template name="trigger">
        <xsl:param name="classes"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="appearance" select="@appearance"/>
        <xsl:variable name="name" select="concat($data-prefix,$id)"/>
        <xsl:variable name="hint" select="if(exists(xforms-hint) and exists(@accesskey)) then concat(normalize-space(xforms:hint),'- KEY: [ALT]+ ',@accesskey) else normalize-space(xforms:hint)"/>
        <xsl:variable name="src" select="@src" />
        <xsl:variable name="incremental" />
        <xsl:variable name="control-classes">
            <xsl:call-template name="assemble-control-classes">
                <xsl:with-param name="appearance" select="$appearance"/>
            </xsl:call-template>
        </xsl:variable>
        <div id="{$id}" class="{$control-classes}" dojoType="chiba.ui.Control">
        <!-- minimal appearance only supported in scripted mode -->
            <xsl:choose>
                <xsl:when test="$appearance='minimal'">
                        <span id="{$id}-value"
                              appearance="{@appearance}"
                              controlType="minimalTrigger"
                              name="{$name}"
                              class="xfValue"
                              title="{$hint}"
                              navindex="{$navindex}"
                              accesskey="{@accesskey}"
                              label="{xforms:label}"
                              source="{$src}">                            
                        </span>
                </xsl:when>
                <xsl:otherwise>
                    <div    id="{$id}-value"
                            appearance="{@appearance}"
                            controlType="trigger"
                            label="{xforms:label}"
                            name="{$name}"
                            class="xfValue"
                            title="{$hint}"
                            navindex="{$navindex}"
                            accesskey="{@accesskey}"
                            source="{$src}"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
<!--
                <span id="{concat($id,'-value')}" class="value"><img src="{concat($contextroot,'/resources/images/spacer.gif')}" width="150px" height="20px"/>
                    <xsl:value-of select="chiba:data/text()"/>
                </span>
                <xsl:if test="contains(@xforms:src,'.gif') or contains(@xforms:src,'.jpg') or contains(@xforms:src,'.png')">
                    <img alt="{xforms:label}" src="{@xforms:src}" id="{@id}-label"/>
                </xsl:if>
-->
    </xsl:template>

    <!-- build upload control -->
    <xsl:template name="upload">
        <!-- the stylesheet using this template has to take care, that form enctype is set to 'multipart/form-data' -->
        <xsl:variable name="id" select="@id"/>
        <xsl:variable name="navindex" select="if (exists(@navindex)) then @navindex else '0'"/>
        <xsl:element name="input">
            <xsl:if test="string-length($navindex) != 0">
                <xsl:attribute name="tabindex">
                    <xsl:value-of select="$navindex"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:attribute name="id">
                <xsl:value-of select="concat($id,'-value')"/>
            </xsl:attribute>
            <xsl:attribute name="name">
                <xsl:value-of select="concat($data-prefix,$id)"/>
            </xsl:attribute>
            <xsl:attribute name="type">file</xsl:attribute>
            <xsl:attribute name="value"/>
            <xsl:if test="chiba:data/@chiba:readonly='true'">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
            <xsl:attribute name="class">xfValue</xsl:attribute>
			<!-- Content types accepted, from mediatype xforms:upload attribute
            to accept input attribute -->
            <!--
                        <xsl:attribute name="accept">
                            <xsl:value-of select="translate(normalize-space(@xforms:mediatype),' ',',')"/>
                        </xsl:attribute>
            -->
            <xsl:attribute name="dojoType">chiba.ui.upload.Upload</xsl:attribute>
                <!--<xsl:attribute name="onchange">submitFile(this);</xsl:attribute>-->
            <xsl:attribute name="xfreadonly">
                <xsl:value-of select="chiba:data/@chiba:readonly"/>
            </xsl:attribute>
            <xsl:apply-templates select="xforms:hint"/>
        </xsl:element>

<!--
        <iframe id="UploadTarget" name="UploadTarget" src="" style="width:0px;height:0px;border:0"/>
        <div class="progressbar" style="display:none;" id="{$id}-progress">
            <div class="border">
                <div id="{$id}-progress-bg" class="background"/>
            </div>
        </div>
    -->
        <xsl:if test="xforms:filename">
            <input type="hidden" id="{xforms:filename/@id}" value="{xforms:filename/chiba:data}"/>
        </xsl:if>
        <xsl:if test="@chiba:destination">
            <!-- create hidden parameter for destination -->
            <input type="hidden" id="{$id}-destination" value="{@chiba:destination}"/>
        </xsl:if>
    </xsl:template>


    <!-- ######################################################################################################## -->
    <!-- ########################################## HELPER TEMPLATES FOR SELECT, SELECT1 ######################## -->
    <!-- ######################################################################################################## -->

    <xsl:template name="build-items">
        <xsl:param name="parent"/>

		<!-- add an empty item, because otherwise deselection is not possible -->
<!--        <xsl:if test="$parent/chiba:data/@chiba:required='false'">-->
<!--		<option value="">
			<xsl:if test="string-length($parent/chiba:data/text()) = 0">
				<xsl:attribute name="selected">selected</xsl:attribute>
			</xsl:if>
		</option>-->
<!--        </xsl:if>-->
		<xsl:for-each select="$parent/xforms:itemset|$parent/xforms:item|$parent/xforms:choices">
			<xsl:call-template name="build-items-list"/>
		</xsl:for-each>
    </xsl:template>

    <xsl:template name="build-items-list">
    	<xsl:choose>
    		<xsl:when test="local-name(.) = 'choices'">
    			<xsl:call-template name="build-items-choices"/>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'itemset'">
    			<xsl:call-template name="build-items-itemset"/>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'item'">
    			<xsl:call-template name="build-items-item"/>
    		</xsl:when>
    	</xsl:choose>
    </xsl:template>

	<xsl:template name="build-items-choices">
		<xsl:for-each select="xforms:itemset|xforms:item|xforms:choices">
			<xsl:call-template name="build-items-list"/>
		</xsl:for-each>
	</xsl:template>

    <xsl:template name="build-items-itemset">
		<optgroup id="{@id}" dojoType="chiba.ui.select.OptGroup">
			<xsl:for-each select="xforms:item">
				<xsl:call-template name="build-items-item"/>
            </xsl:for-each>
		</optgroup>
	</xsl:template>

	<xsl:template name="build-items-item">
		    <option id="{@id}" value="{xforms:value}" title="{xforms:hint}" class="xfSelectorItem">
			<xsl:if test="@selected='true'">
				<xsl:attribute name="selected">selected</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="xforms:label" />
		</option>
	</xsl:template>

    <xsl:template name="build-item-prototype">
        <xsl:param name="item-id"/>
        <xsl:param name="itemset-id"/>

        <select id="{$itemset-id}-prototype" class="xfSelectorPrototype">
            <option id="{$item-id}-value" class="xfSelectorPrototype">
	           	<xsl:choose>
    	       		<xsl:when test="xforms:copy">
	    	   			<xsl:attribute name="value" select="xforms:copy/@id"/>
	              		<xsl:attribute name="title" select="xforms:copy/@id"/>
    	          	</xsl:when>
        	      	<xsl:otherwise>
            	   		<xsl:attribute name="value" select="normalize-space(xforms:value)"/>
              			<xsl:attribute name="title" select="xforms:hint"/>
                	</xsl:otherwise>
				</xsl:choose>
                <xsl:if test="@selected='true'">
                    <xsl:attribute name="selected">selected</xsl:attribute>
                </xsl:if>
                <xsl:value-of select="xforms:label"/>
            </option>
        </select>
    </xsl:template>


    <xsl:template name="build-checkboxes-list">
    	<xsl:param name="name"/>
        <xsl:param name="parent"/>
    	<xsl:choose>
    		<xsl:when test="local-name(.) = 'choices'">
    			<xsl:call-template name="build-checkboxes-choices">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'itemset'">
    			<xsl:call-template name="build-checkboxes-itemset">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'item'">
    			<xsl:call-template name="build-checkboxes-item">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    	</xsl:choose>
    </xsl:template>


	<xsl:template name="build-checkboxes-choices">
		<xsl:param name="name"/>
        <xsl:param name="parent"/>
		<xsl:for-each select="xforms:itemset|xforms:item|xforms:choices">
			<xsl:call-template name="build-checkboxes-list">
				<xsl:with-param name="name" select="$name"/>
           		<xsl:with-param name="parent" select="$parent"/>
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>

    <xsl:template name="build-checkboxes-itemset">
    	<xsl:param name="name"/>
        <xsl:param name="parent"/>
		<span id="{@id}" dojoType="chiba.ui.select.CheckBoxItemset" >
			<xsl:for-each select="xforms:item">
				<xsl:call-template name="build-checkboxes-item">
	           		<xsl:with-param name="name" select="$name"/>
	           		<xsl:with-param name="parent" select="$parent"/>
				</xsl:call-template>
			</xsl:for-each>
		</span>
	</xsl:template>

	<xsl:template name="build-checkboxes-item">
    	<xsl:param name="name"/>
        <xsl:param name="parent"/>
        <xsl:param name="navindex"/>
        <span id="{@id}" class="xfSelectorItem">
            <input id="{@id}-value"
                   class="xfValue"
                   type="checkbox"
                   tabindex="0"
                   selectWidgetId="{$parent/@id}-value"
                   name="{$name}"
                   dojotype="chiba.ui.select.CheckBox">
                <xsl:if test="@selected='true'">
                    <xsl:attribute name="checked">checked</xsl:attribute>
                </xsl:if>

                <xsl:choose>
        			<xsl:when test="xforms:copy">
           				<xsl:attribute name="value" select="xforms:copy/@id"/>
	            	</xsl:when>
    	        	<xsl:otherwise>
	    	    		<xsl:attribute name="value" select="xforms:value"/>
    	    		</xsl:otherwise>
        	    </xsl:choose>
                <xsl:choose>
                    <xsl:when test="xforms:hint">
                        <xsl:apply-templates select="xforms:hint"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="$parent/xforms:hint"/>
                    </xsl:otherwise>
                </xsl:choose>
            </input>
            <label id="{@id}-label" for="{@id}-value" class="xfLabel">
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:apply-templates select="xforms:label"/>
            </label>
        </span>
	</xsl:template>

    <xsl:template name="build-checkbox-prototype">
        <xsl:param name="item-id"/>
        <xsl:param name="itemset-id"/>
        <xsl:param name="name"/>
        <xsl:param name="parent"/>

        <span id="{$itemset-id}-prototype" class="xfSelectorPrototype">
            <input id="{$item-id}-value" class="xfValue" type="checkbox" name="{$name}">
                <xsl:choose>
	       			<xsl:when test="xforms:copy">
		   				<xsl:attribute name="value"><xsl:value-of select="xforms:copy/@id"/></xsl:attribute>
	              	</xsl:when>
    	        	<xsl:otherwise>
      	 	    		<xsl:attribute name="value"><xsl:value-of select="xforms:value"/></xsl:attribute>
            		</xsl:otherwise>
           	    </xsl:choose>
                <xsl:attribute name="title">
                    <xsl:choose>
                        <xsl:when test="xforms:hint">
                            <xsl:value-of select="xforms:hint"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$parent/xforms:hint"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:if test="@selected='true'">
                    <xsl:attribute name="checked">checked</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="onclick">setXFormsValue(this);</xsl:attribute>
                <xsl:attribute name="onkeydown">DWRUtil.onReturn(event, submitFunction);</xsl:attribute>
            </input>
            <span id="{@item-id}-label" class="xfLabel">
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:apply-templates select="xforms:label"/>
            </span>
        </span>
    </xsl:template>

    <!-- overwrite/change this template, if you don't like the way labels are rendered for checkboxes -->
    <xsl:template name="build-radiobuttons">
        <xsl:param name="name"/>
        <xsl:param name="parent"/>
        <xsl:param name="id"/>
        <xsl:param name="navindex"/>
        <!-- handle items, choices and itemsets -->
        <xsl:for-each select="$parent/xforms:item|$parent/xforms:choices|$parent/xforms:itemset">
        	<xsl:call-template name="build-radiobuttons-list">
        		<xsl:with-param name="name" select="$name"/>
        		<xsl:with-param name="parent" select="$parent"/>
        	</xsl:call-template>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="build-radiobuttons-list">
    	<xsl:param name="name"/>
    	<xsl:param name="parent"/>
        <!-- todo: refactor to handle xforms:choice / xforms:itemset by matching -->
        <xsl:choose>
    		<xsl:when test="local-name(.) = 'choices'">
    			<xsl:call-template name="build-radiobuttons-choices">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'itemset'">
    			<xsl:call-template name="build-radiobuttons-itemset">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    		<xsl:when test="local-name(.) = 'item'">
    			<xsl:call-template name="build-radiobuttons-item">
            		<xsl:with-param name="name" select="$name"/>
            		<xsl:with-param name="parent" select="$parent"/>
            	</xsl:call-template>
    		</xsl:when>
    	</xsl:choose>
    </xsl:template>

	<xsl:template name="build-radiobuttons-choices">
		<xsl:param name="name"/>
		<xsl:param name="parent"/>
		<xsl:for-each select="xforms:itemset|xforms:item|xforms:choices">
			<xsl:call-template name="build-radiobuttons-list">
				<xsl:with-param name="name" select="$name"/>
           		<xsl:with-param name="parent" select="$parent"/>
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>

    <xsl:template name="build-radiobuttons-itemset">
    	<xsl:param name="name"/>
    	<xsl:param name="parent"/>
		<div id="{@id}" dojoType="chiba.ui.select1.RadioItemset">
			<xsl:for-each select="xforms:item">
				<xsl:call-template name="build-radiobuttons-item">
	           		<xsl:with-param name="name" select="$name"/>
	           		<xsl:with-param name="parent" select="$parent"/>
				</xsl:call-template>
			</xsl:for-each>
		</div>
	</xsl:template>

	<xsl:template name="build-radiobuttons-item">
    	<xsl:param name="name"/>
    	<xsl:param name="parent"/>
        <xsl:param name="navindex"/>
        <xsl:variable name="parentId" select="$parent/@id"/>
        <span id="{@id}"
              class="xfSelectorItem"
              controlType="radioButtonEntry">
            <input id="{@id}-value"
                   class="xfValue"
                   dataType="radio"
                   controlType="radio"
                   parentId="{$parentId}"
                   name="{$name}"
                   selected="{@selected}"
                   >
                <xsl:if test="string-length($navindex) != 0">
                    <xsl:attribute name="tabindex">
                        <xsl:value-of select="$navindex"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:choose>
        			<xsl:when test="xforms:copy">
           				<xsl:attribute name="value" select="xforms:copy/@id"/>
	            	</xsl:when>
    	        	<xsl:otherwise>
	    	    		<xsl:attribute name="value" select="xforms:value"/>
    	    		</xsl:otherwise>
        	    </xsl:choose>
                <xsl:choose>
                    <xsl:when test="xforms:hint">
                        <xsl:apply-templates select="xforms:hint"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="$parent/xforms:hint"/>
                    </xsl:otherwise>
                </xsl:choose>
            </input>
            <label id="{@id}-label" for="{@id}-value" class="xfLabel">
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:apply-templates select="xforms:label"/>
            </label>
        </span>
	</xsl:template>

    <xsl:template name="build-radiobutton-prototype">
        <xsl:param name="item-id"/>
        <xsl:param name="itemset-id"/>
        <xsl:param name="name"/>
        <xsl:param name="parent"/>
        <xsl:param name="navindex"/>
        <span id="{$itemset-id}-prototype" class="xfSelectorPrototype">
            <input id="{$item-id}-value" class="xfValue" type="radio" name="{$name}">
                <xsl:if test="string-length($navindex) != 0">
                    <xsl:attribute name="tabindex">
                        <xsl:value-of select="$navindex"/>
                    </xsl:attribute>
                </xsl:if>

                <xsl:choose>
					<xsl:when test="xforms:copy">
   						<xsl:attribute name="value" select="xforms:copy/@id"/>
	            	</xsl:when>
    	        	<xsl:otherwise>
	    	    		<xsl:attribute name="value" select="xforms:value"/>
    	    		</xsl:otherwise>
        	    </xsl:choose>
                <xsl:choose>
                    <xsl:when test="xforms:hint">
                        <xsl:apply-templates select="xforms:hint"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="$parent/xforms:hint"/>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:if test="@selected='true'">
                    <xsl:attribute name="checked">checked</xsl:attribute>
                </xsl:if>
                <xsl:attribute name="onclick">setXFormsValue(this);</xsl:attribute>
                <xsl:attribute name="onkeydown">DWRUtil.onReturn(event, submitFunction);</xsl:attribute>
            </input>
            <span id="{$item-id}-label" class="xfLabel">
                <xsl:if test="$parent/chiba:data/@chiba:readonly='true'">
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                </xsl:if>
                <xsl:apply-templates select="xforms:label"/>
            </span>
        </span>
    </xsl:template>


</xsl:stylesheet>
