/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.range.Slider"]){
dojo._hasResource["chiba.ui.range.Slider"]=true;
dojo.provide("chiba.ui.range.Slider");
dojo.require("dijit.form.Slider");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("chiba.ui.range.Slider",[chiba.ui.ControlValue,dijit.form.HorizontalSlider],{postMixInProperties:function(){
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
return this.valueNode.value;
},_setValueAttr:function(_1,_2){
if(this.incremental&&this.valueNode.value!=_1){
this.setControlValue();
}
this.inherited(arguments);
},_handleSetControlValue:function(_3){
this._setValueAttr(_3);
}});
}
