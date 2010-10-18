/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.Control"]){
dojo._hasResource["chiba.ui.Control"]=true;
dojo.provide("chiba.ui.Control");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.UIElementFactory");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.Button");
dojo.declare("chiba.ui.Control",[dijit._Widget,dijit._Templated],{id:"",target:null,value:"",dataType:"",controlType:"",valid:true,readonly:false,required:false,relevant:true,controlValue:null,contextInfo:null,tabindex:0,appearance:"",buildRendering:function(){
this.domNode=this.srcNodeRef;
if(dojo.attr(this.domNode,"tabindex")){
this.tabindex=eval(dojo.attr(this.domNode,"tabindex"));
}
},postCreate:function(){
if(!dojo.hasClass(this.domNode,"xfDisabled")){
dojo.addClass(this.domNode,"xfEnabled");
}
if(!dojo.hasClass(this.domNode,"xfReadOnly")){
dojo.addClass(this.domNode,"xfReadWrite");
}
if(!dojo.hasClass(this.domNode,"xfRequired")){
dojo.addClass(this.domNode,"xfOptional");
}
if(!dojo.hasClass(this.domNode,"xfInvalid")){
dojo.addClass(this.domNode,"xfValid");
}
if(this.controlValue==undefined){
var _1=dojo.query("*[id ='"+this.id+"-value']",this.domNode)[0];
if(_1==undefined){
_1=dojo.query(".xfValue",this.domNode)[0];
}
if(_1==undefined){
if(this.contextInfo.type!=undefined){
var _2=this.contextInfo.type;
if(_2.indexOf(":")!=-1){
_2=_2.substring(_2.indexOf(":")+1,_2.length);
}
_2="xsd"+_2.replace(/^[a-z]/,_2.substring(0,1).toUpperCase());
if(dojo.hasClass(this.domNode,"xsd")){
chiba.ui.util.replaceClass(this.domNode,"xsd",_2);
}else{
dojo.addClass(this.domNode,_2);
}
}else{
if(dojo.hasClass(this.domNode,"xsd")){
console.warn("Control.postCreate Control "+this.id+" has no type but xsd on it's prototype");
}
}
this._updateMIPClasses();
_1=document.createElement("div");
this.dataType=this.contextInfo.type;
this.controlType=this.contextInfo.targetName;
dojo.attr(_1,"dataType",this.dataType);
dojo.attr(_1,"controlType",this.controlType);
if(this.contextInfo.value!=undefined&&this.dataType=="date"){
this.controlType=dojo.attr(_1,"schemaValue",this.contextInfo.schemaValue);
}
if(this.contextInfo.targetId!=undefined){
this.controlType=dojo.attr(_1,"id",this.contextInfo.targetId+"-value");
}
if(dojo.attr(this.domNode,"appearance")!=undefined){
this.appearance=dojo.attr(this.domNode,"appearance");
dojo.attr(_1,"appearance",this.appearance);
}
if(this.contextInfo.targetName!="trigger"){
_1.innerHTML=this.contextInfo.value;
}else{
dojo.attr(_1,"label",this.srcNodeRef.innerHTML);
this.domNode.innerHTML="";
}
dojo.addClass(_1,"xfValue");
dojo.place(_1,this.domNode);
this.controlValue=fluxProcessor.factory.createWidget(_1,this.id);
}else{
this.dataType=dojo.attr(_1,"datatype");
this.controlType=dojo.attr(_1,"controltype");
this.controlValue=fluxProcessor.factory.createWidget(_1,this.id);
}
this.controlValue.applyState();
}
},isRequired:function(){
if(dojo.hasClass(this.domNode,"xfOptional")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfRequired")){
return true;
}else{
console.error("No required state found");
}
}
},isReadonly:function(){
if(dojo.hasClass(this.domNode,"xfReadWrite")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfReadOnly")){
return true;
}else{
console.error("No readonly state found");
}
}
},isRelevant:function(){
if(dojo.hasClass(this.domNode,"xfDisabled")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfEnabled")){
return true;
}else{
console.error("No relevant state found");
}
}
},isValid:function(){
if(dojo.hasClass(this.domNode,"xfInvalid")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfValid")){
return true;
}else{
console.error("No validate state found for "+this.id);
}
}
},handleStateChanged:function(_3){
if(_3["parentId"]){
this._handleHelperChanged(_3);
}else{
this.value=_3["value"];
this.valid=_3["valid"];
this.readonly=_3["readonly"];
this.required=_3["required"];
this.relevant=_3["enabled"];
if(this.datatype!=null){
this._setTypeProperty(eval(_3["type"]));
}
if(this.value!=null){
if(_3["type"]=="date"){
this._handleSetControlValue(_3["schemaValue"]);
}else{
this._handleSetControlValue(this.value);
}
}
if(this.valid!=null){
this._handleSetValidProperty(eval(this.valid));
}
if(this.readonly!=null){
this._handleSetReadonlyProperty(eval(this.readonly));
}
if(this.required!=null){
this._handleSetRequiredProperty(eval(this.required));
}
if(this.relevant!=null){
this._handleSetEnabledProperty(eval(this.relevant));
}
}
},_onFocus:function(){
},_onBlur:function(){
},getControlValue:function(){
return this.controlValue._getControlValue();
},_setTypeProperty:function(_4){
if(this.controlValue==undefined||this.dataType!=_4){
var _5=dojo.query("*[id ='"+this.id+"-value']",this.domNode)[0];
if(_5==undefined){
_5=dojo.query(".xfValue",this.domNode)[0];
}
if(_5==undefined){
console.error("Control.handleStateChanged Error: XFControl "+this.id+" has no ControlValue node");
}else{
this.controlValue=fluxProcessor.factory.createWidget(_5,this.id);
this.addChild(this.controlValue);
}
}
},_handleSetControlValue:function(_6){
this.controlValue._handleSetControlValue(_6);
if(this.controlValue.currentValue!=_6){
this.controlValue.currentValue=_6;
}
},_handleSetValidProperty:function(){
if(this.valid=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfInvalid","xfValid");
this.controlValue.displayValidity(true);
dojo.publish("/xf/valid",[this]);
}else{
chiba.ui.util.replaceClass(this.domNode,"xfValid","xfInvalid");
this.controlValue.displayValidity(false);
dojo.publish("/xf/invalid",[this]);
}
},_handleSetReadonlyProperty:function(){
if(this.readonly=="false"){
chiba.ui.util.replaceClass(this.domNode,"xfReadOnly","xfReadWrite");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfReadWrite","xfReadOnly");
}
this.controlValue.applyState();
},_handleSetRequiredProperty:function(){
if(this.required=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfOptional","xfRequired");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfRequired","xfOptional");
if(dojo.hasClass(this.domNode,"xfRequiredEmpty")){
dojo.removeClass(this.domNode,"xfRequiredEmpty");
}
}
},_handleSetEnabledProperty:function(){
var _7=this.id;
var _8=dojo.byId(_7+"-label");
if(this.relevant=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfDisabled","xfEnabled");
chiba.ui.util.replaceClass(_8,"xfDisabled","xfEnabled");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfEnabled","xfDisabled");
chiba.ui.util.replaceClass(_8,"xfEnabled","xfDisabled");
}
},_handleHelperChanged:function(_9){
switch(_9["targetName"]){
case "label":
this.controlValue._setLabel(_9["value"]);
return;
case "help":
this._setHelp(_9["value"]);
return;
case "hint":
this._setHint(_9["value"]);
return;
case "alert":
this._setAlert(_9["value"]);
return;
case "value":
this.controlValue._handleSetControlValue(_9["value"]);
return;
}
},_updateMIPClasses:function(){
if(this.contextInfo.enabled!=undefined){
if(this.contextInfo.enabled=="true"){
dojo.addClass(this.domNode,"xfEnabled");
}else{
dojo.addClass(this.domNode,"xfDisabled");
}
}
if(this.contextInfo.readonly!=undefined){
if(this.contextInfo.readonly=="true"){
dojo.addClass(this.domNode,"xfReadOnly");
}else{
dojo.addClass(this.domNode,"xfReadWrite");
}
}
if(this.contextInfo.required!=undefined){
if(this.contextInfo.required=="true"){
dojo.addClass(this.domNode,"xfRequired");
}else{
dojo.addClass(this.domNode,"xfOptional");
}
}
if(this.contextInfo.valid!=undefined){
if(this.contextInfo.valid=="true"){
dojo.addClass(this.domNode,"xfValid");
}else{
dojo.addClass(this.domNode,"xfInvalid");
}
}
},updateProgress:function(_a){
this.controlValue.updateProgress(_a);
},setControlValue:function(_b){
fluxProcessor.setControlValue(this.id,_b);
},_setHelp:function(_c){
console.warn("TBD: Control._setHelp value:"+_c);
},_setHint:function(_d){
console.warn("TBD: Control._setHint value:"+_d);
},_setAlert:function(_e){
console.warn("TBD: Control._setAlert value:"+_e);
},_setValueChild:function(_f){
console.warn("TBD: Control._setValueChild value:"+_f);
}});
}
