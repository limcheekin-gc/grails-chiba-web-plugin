/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.input.Boolean"]){
dojo._hasResource["chiba.ui.input.Boolean"]=true;
dojo.provide("chiba.ui.input.Boolean");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.CheckBox");
dojo.declare("chiba.ui.input.Boolean",[chiba.ui.ControlValue,dijit.form.CheckBox],{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
},onClick:function(){
this.inherited(arguments);
this.setControlValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},_handleSetControlValue:function(_1){
if(_1=="true"||_1=="false"){
this.attr("checked",eval(_1));
}
},getControlValue:function(){
var _2=eval(this.attr("checked"));
if(_2==undefined){
var _3=this.attr("value");
_2=eval(_3);
}
if(_2!=undefined&&_2){
return true;
}else{
return false;
}
},setTextValue:function(_4){
this.xfControl.setControlValue(this.checked);
},getTextValue:function(){
return this.checked;
}});
}
