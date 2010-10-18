/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.ContentPaneGroup"]){
dojo._hasResource["chiba.ui.container.ContentPaneGroup"]=true;
dojo.provide("chiba.ui.container.ContentPaneGroup");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.container.Container");
dojo.require("dijit.layout.ContentPane");
dojo.declare("chiba.ui.container.ContentPaneGroup",[chiba.ui.container.Container,dijit.layout.ContentPane],{buildRendering:function(){
this.inherited(arguments);
this.calculateClasses();
},handleStateChanged:function(_1){
this.inherited(arguments);
}});
}
