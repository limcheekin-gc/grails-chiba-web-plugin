/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.Group"]){
dojo._hasResource["chiba.ui.container.Group"]=true;
dojo.provide("chiba.ui.container.Group");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.container.Container");
dojo.declare("chiba.ui.container.Group",chiba.ui.container.Container,{handleStateChange:function(){
this.inherited(arguments);
}});
}
