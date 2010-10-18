/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.input.Date"]){
dojo._hasResource["chiba.ui.input.Date"]=true;
dojo.provide("chiba.ui.input.Date");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.DateTextBox");
dojo.declare("chiba.ui.input.Date",[chiba.ui.ControlValue,dijit.form.DateTextBox],{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.handleOnBlur();
this.inherited(arguments);
},getControlValue:function(){
var _1=this.attr("value");
if(_1==undefined){
console.warn("Invalid date: this: ",this," this.focusNode",this.focusNode," this.focusNode.value:",this.focusNode.value);
return this.focusNode.value;
}else{
return dojo.date.stamp.toISOString(_1);
}
},_handleSetControlValue:function(_2){
if(_2==undefined||_2==""){
this._setValueAttr("");
}else{
this._setValueAttr(dojo.date.stamp.fromISOString(_2));
}
}});
}
