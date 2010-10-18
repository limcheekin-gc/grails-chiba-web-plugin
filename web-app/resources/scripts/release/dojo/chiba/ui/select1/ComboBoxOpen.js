/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select1.ComboBoxOpen"]){
dojo._hasResource["chiba.ui.select1.ComboBoxOpen"]=true;
dojo.provide("chiba.ui.select1.ComboBoxOpen");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.ComboBox");
dojo.declare("chiba.ui.select1.ComboBoxOpen",[chiba.ui.ControlValue,dijit.form.ComboBox],{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
if(dojo.attr(this.srcNodeRef,"incremental")==undefined||dojo.attr(this.srcNodeRef,"incremental")==""||dojo.attr(this.srcNodeRef,"incremental")=="true"){
this.incremental=true;
}else{
this.incremental=false;
}
},postCreate:function(){
this.inherited(arguments);
var _1=dojo.query("*[selected]",this.srcNodeRef)[0];
if(_1!=undefined){
var _2=dojo.attr(_1,"value");
this.setCurrentValue(_2);
this.focusNode.value=_2;
}else{
this.setCurrentValue("");
this.focusNode.value="";
}
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},getControlValue:function(){
return this.focusNode.value;
},onChange:function(_3){
this.inherited(arguments);
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_4){
this.attr("displayedValue",_4);
}});
}
