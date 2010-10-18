<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xforms="http://www.w3.org/2002/xforms"
    xmlns:chiba="http://chiba.sourceforge.net/xforms"
    exclude-result-prefixes="xhtml xforms chiba">

    <!-- Copyright 2008 - Joern Turner, Lars Windauer
         Licensed under the terms of BSD and Apache 2 Licenses -->

    <xsl:import href="dojo.xsl"/>
    <!-- ### CDN support is not avaibable for this stylesheet -->
    <xsl:variable name="useCDN" select="'false'"/>

    <xsl:template name="addDojoCSS"><xsl:text>
</xsl:text>
                <style type="text/css">
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dijit/themes/tundra/tundra.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojo/resources/dojo.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojox/widget/Toaster/Toaster.css";
                    @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojox/layout/resources/FloatingPane.css";
	                @import "<xsl:value-of select="$contextroot"/>/resources/scripts/dojox/layout/resources/ResizeHandle.css";
                </style><xsl:text>
</xsl:text>
    </xsl:template>

    <xsl:template name="addDojoConfig">
        <script type="text/javascript">
            var djConfig = {
                debugAtAllCost:<xsl:value-of select="$debug-enabled"/>,
                isDebug:<xsl:value-of select="$debug-enabled"/>,
                parseOnLoad:false
            };
        </script><xsl:text>
</xsl:text>
    </xsl:template>

    <!-- ### the dev stylesheet currently does not support to use a CDN in conjunction with local code but
    that's probably a exotic use case. -->
    <xsl:template name="addDojoImport">
        <script type="text/javascript" src="{concat($contextroot,$scriptPath,'dojo/dojo.js')}"> </script><xsl:text>
</xsl:text>
    </xsl:template>

    <xsl:template name="addDojoRequires">
                dojo.require("dojo.parser");
                dojo.require("dojo.fx");
                dojo.require("dojo.NodeList-fx");
                dojo.require("dojo.dnd.Selector");
                dojo.require("dojo.dnd.Source");

                dojo.require("dijit._Widget");
                dojo.require("dijit.Dialog");
                dojo.require("dijit.TitlePane");
                dojo.require("dijit.Tooltip");
                dojo.require("dijit.form.CheckBox");
                dojo.require("dijit.form.Button");
                dojo.require("dijit.layout.ContentPane");
                dojo.require("dijit.layout.TabContainer");
                dojo.require("dijit.layout.BorderContainer");
                dojo.require("dijit.layout.AccordionContainer");
                dojo.require("dojox.layout.FloatingPane");

                <!--dojo.require("dojox.widget.FisheyeLite");-->
                dojo.require("dojox.widget.Toaster");
                dojo.require("chiba.FluxProcessor");
                dojo.require("chiba.XFormsModelElement");
                dojo.require("chiba.ui.Control");
                dojo.require("chiba.ui.FisheyeLite");
                dojo.require("chiba.ui.InlineEditBox");
                dojo.require("chiba.ui.util");
                dojo.require("chiba.ui.XFormsStore");
                dojo.require("chiba.ui.container.AccordionSwitch");
                dojo.require("chiba.ui.container.AccordionSwitchPane");
                dojo.require("chiba.ui.container.Container");
                dojo.require("chiba.ui.container.ContentPaneGroup");
                dojo.require("chiba.ui.container.Group");
                dojo.require("chiba.ui.container.Repeat");
                dojo.require("chiba.ui.container.RepeatItem");
                dojo.require("chiba.ui.container.Switch");
                dojo.require("chiba.ui.container.TabSwitch");
                dojo.require("chiba.ui.input.Boolean");
                dojo.require("chiba.ui.input.Date");
                dojo.require("chiba.ui.input.TextField");
                dojo.require("chiba.ui.output.Image");
                dojo.require("chiba.ui.output.Html");
                dojo.require("chiba.ui.output.Link");
                dojo.require("chiba.ui.output.Plain");
                dojo.require("chiba.ui.range.Slider");
                dojo.require("chiba.ui.range.Rating");
                dojo.require("chiba.ui.secret.Secret");
                dojo.require("chiba.ui.select1.ComboBox");
                dojo.require("chiba.ui.select1.ComboBoxOpen");
                dojo.require("chiba.ui.select1.Plain");
                dojo.require("chiba.ui.select1.RadioButton");
                dojo.require("chiba.ui.select1.RadioGroup");
                dojo.require("chiba.ui.select1.RadioItemset");
                dojo.require("chiba.ui.select.CheckBox");
                dojo.require("chiba.ui.select.CheckBoxGroup");
                dojo.require("chiba.ui.select.CheckBoxItemset");
                dojo.require("chiba.ui.select.MultiSelect");
                dojo.require("chiba.ui.select.OptGroup");
                dojo.require("chiba.ui.textarea.DojoEditor");
                dojo.require("chiba.ui.textarea.HtmlEditor");
                dojo.require("chiba.ui.textarea.MinimalTextarea");
                dojo.require("chiba.ui.textarea.SimpleTextarea");
                dojo.require("chiba.ui.timeline.TimeLine");
                dojo.require("chiba.ui.tree.OPMLTree");
                dojo.require("chiba.ui.trigger.Button");
                dojo.require("chiba.ui.trigger.LinkButton");
                dojo.require("chiba.ui.upload.Upload");
                dojo.require("chiba.ui.upload.UploadPlain");
    </xsl:template>

</xsl:stylesheet>
