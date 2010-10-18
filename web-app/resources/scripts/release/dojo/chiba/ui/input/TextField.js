/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.input.TextField"]){
dojo._hasResource["chiba.ui.input.TextField"]=true;
dojo.provide("chiba.ui.input.TextField");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.TextBox");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.input.TextField",[chiba.ui.ControlValue,dijit.form.TextBox],{intermediateChanges:true,postMixInProperties:function(){
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
}else{
this.handleEmptyRequired();
}
},_handleOnChange:function(_1,_2){
if(this.incremental&&this.intermediateChanges==false){
this.setControlValue();
}
this.intermediateChanges=false;
},getControlValue:function(){
return this._getValueAttr();
},_handleSetControlValue:function(_3){
this.focusNode.value=_3;
this.attr("displayedValue",_3);
},setTextValue:function(_4){
this.setControlValue(this.getControlValue());
},getTextValue:function(){
return this.getControlValue();
}});
}
