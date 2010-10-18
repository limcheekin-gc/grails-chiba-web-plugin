/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.OuterGroup"]){
dojo._hasResource["chiba.ui.container.OuterGroup"]=true;
dojo.provide("chiba.ui.container.OuterGroup");
dojo.require("dijit._Widget");
dojo.require("dijit.layout.ContentPane");
dojo.declare("chiba.ui.container.OuterGroup",dijit.layout.ContentPane,{onLoad:function(e){
this.inherited(arguments);
}});
}
