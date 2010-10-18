/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.range.Rating"]){
dojo._hasResource["chiba.ui.range.Rating"]=true;
dojo.provide("chiba.ui.range.Rating");
dojo.require("dojox.form.Rating");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("chiba.ui.range.Rating",[chiba.ui.ControlValue,dojox.form.Rating],{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},getControlValue:function(){
return this.attr("value");
},onStarClick:function(_1){
this.inherited(arguments);
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
this.setAttribute("value",_2);
}});
}
