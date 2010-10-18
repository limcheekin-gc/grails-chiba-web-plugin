/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.textarea.SimpleTextarea"]){
dojo._hasResource["chiba.ui.textarea.SimpleTextarea"]=true;
dojo.provide("chiba.ui.textarea.SimpleTextarea");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.SimpleTextarea");
dojo.declare("chiba.ui.textarea.SimpleTextarea",[chiba.ui.ControlValue,dijit.form.SimpleTextarea],{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
dojo.connect(this.domNode,"onkeypress",this,"_valueChanged");
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},getControlValue:function(){
return this._getValueAttr();
},_valueChanged:function(_1){
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
this._setValueAttr(_2);
}});
}
