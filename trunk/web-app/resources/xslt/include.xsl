<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:chiba="http://chiba.sourceforge.net/xforms"
    exclude-result-prefixes="chiba xsl">

    <!-- Copyright 2008 - Joern Turner, Lars Windauer
         Licensed under the terms of BSD and Apache 2 Licenses -->
    
    <xsl:param name="rootDir" select="'../../../../../../src/main/xforms'"/>

    <!--
    Simple Stylesheet to assemble XForms documents from markup found in other files.

    Syntax for includes:
    <chiba:include src="[path]#[id]/>

    where [path] is the relative path to the file to be included (basedir is determined by $rootDir global var)
          [id] is some element in the file identified by [filename] that has a matching id Attribute

    -->
    <xsl:strip-space elements="*"/>
    <xsl:template match="/">
        <xsl:copy>
            <xsl:apply-templates/>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*"/>
            <xsl:apply-templates />
        </xsl:copy>
    </xsl:template>

    <xsl:template match="chiba:include">
        <xsl:variable name="file" select="concat($rootDir,substring-before(@src,'#'))"/>
        <xsl:variable name="fragmentId" select="substring-after(@src,'#')"/>

        <xsl:message>Including <xsl:value-of select="$file"/>:<xsl:value-of select="$fragmentId"/></xsl:message>
        <xsl:apply-templates select="document($file)//*[@id=$fragmentId]"/>
    </xsl:template>

</xsl:stylesheet>
