/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.ControlValue"]){
dojo._hasResource["chiba.ui.ControlValue"]=true;
dojo.provide("chiba.ui.ControlValue");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo._base.fx");
dojo.declare("chiba.ui.ControlValue",[dijit._Widget,dijit._Templated],{id:null,name:"",xfControl:null,incremental:false,currentValue:"",alertTooltip:null,applyProperties:function(_1,_2){
this.xfControl=_1;
if(dojo.attr(_2,"incremental")!=undefined&&dojo.attr(_2,"incremental")!=""){
this.incremental=eval(dojo.attr(_2,"incremental"));
}else{
this.incremental=false;
}
if(dojo.attr(_2,"tabIndex")){
this.tabIndex=eval(dojo.attr(_2,"tabindex"));
}
},setCurrentValue:function(_3){
if(_3!=undefined){
this.currentValue=_3;
}else{
this.currentValue=this.getControlValue();
}
},handleOnFocus:function(){

fluxProcessor.currentControlId=this.xfControl.id;
if(!this.xfControl.isValid()){
dojo.addClass(this.focusNode,"caDisplayInvalid");
this.showAlert();
}
},handleOnBlur:function(){
this.hideAlert();
this.setControlValue();
this.handleEmptyRequired();
},handleEmptyRequired:function(){
if(this.xfControl.isRequired()&&this.currentValue==""){
dojo.addClass(this.xfControl.domNode,"xfRequiredEmpty");
var _4=dojo.byId(this.xfControl.id+"-label");
if(_4!=undefined){
dijit.byId("chibaMessageToaster").setContent("'"+_4.innerHTML+"' is required. Please fill in a value.","message");
}else{
dijit.byId("chibaMessageToaster").setContent("This field is required. Please fill in a value.","message");
}
dijit.byId("chibaMessageToaster").show();
}else{
dojo.removeClass(this.xfControl.domNode,"xfRequiredEmpty");
}
},showAlert:function(){
if(this.alertTooltip==undefined){
this.alertTooltip=new dijit._MasterTooltip();
}
var _5=dojo.byId(this.xfControl.id+"-alert");
if(_5!=undefined){
this.alertTooltip.show(_5.innerHTML,this.domNode);
}
},hideAlert:function(){
if(this.alertTooltip!=undefined){
this.alertTooltip.hide(this.domNode);
}
},displayValidity:function(_6){
if(_6){
dojo.removeClass(this.domNode,"caDisplayInvalid");
}else{
dojo.addClass(this.domNode,"caDisplayInvalid");
}
},applyState:function(){
if(this.xfControl.isReadonly()){
this.attr("disabled",true);
}else{
this.attr("disabled",false);
}
},setControlValue:function(_7){
if(_7!=undefined&&this.currentValue!=_7){
this.currentValue=_7;
this._handleSetControlValue(_7);
}
var _8=this.getControlValue();
if(this.currentValue!=_8){
this.xfControl.setControlValue(_8);
this.currentValue=_8;
}
},_setLabel:function(_9){
var _a=dojo.byId(this.xfControl.id+"-label");
if(_a!=undefined&&_9!=undefined){
_a.innerHTML=_9;
}
},_handleSetControlValue:function(_b){
console.error("chiba.ui.ControlValue: abstract methods _handleSetControlValue() must be implemented by extending class ",this);
},getControlValue:function(){
console.error("chiba.ui.ControlValue: abstract methods _getControlValue() must be implemented by extending class ",this);
}});
}
