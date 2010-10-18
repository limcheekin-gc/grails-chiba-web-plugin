/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.Switch"]){
dojo._hasResource["chiba.ui.container.Switch"]=true;
dojo.provide("chiba.ui.container.Switch");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.container.Container");
dojo.declare("chiba.ui.container.Switch",chiba.ui.container.Container,{handleStateChanged:function(_1){
},toggleCase:function(_2){
var _3=dojo.byId(_2.deselected);
if(dojo.hasClass(_3,"xfSelectedCase")){
dojo.removeClass(_3,"xfSelectedCase");
}
dojo.addClass(_3,"xfDeselectedCase");
var _4=dojo.byId(_2.selected);
if(dojo.hasClass(_4,"xfDeselectedCase")){
dojo.removeClass(_4,"xfDeselectedCase");
}
dojo.addClass(_4,"xfSelectedCase");
}});
}
