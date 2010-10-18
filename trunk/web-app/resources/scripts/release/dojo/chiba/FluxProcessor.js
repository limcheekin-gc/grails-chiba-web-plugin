/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.FluxProcessor"]){
dojo._hasResource["chiba.FluxProcessor"]=true;
dojo.provide("chiba.FluxProcessor");
dojo.require("chiba.XFormsProcessor");
dojo.require("dojo.NodeList-fx");
dojo.require("chiba.ui.UIElementFactory");
dojo.require("dojox.layout.FloatingPane");
dojo.declare("chiba.FluxProcessor",chiba.XFormsProcessor,{sessionKey:"",skipshutdown:false,isDirty:false,factory:null,currentControlId:"",unloadMsg:"You are about to leave this XForms application",constructor:function(){
this.factory=new chiba.ui.UIElementFactory();
dojo.connect(window,"onbeforeunload",this,"handleUnload");
dojo.connect(window,"onunload",this,"close");
this.skipshutdown=false;
},handleUnload:function(_1){
if(this.isDirty==true&&this.skipshutdown==false){
dojo.stopEvent(_1);
_1.returnValue=this.unloadMsg;
return this.unloadMsg;
}
},close:function(){
var _2=dojo.hitch(this,fluxProcessor.skipShutdown).skipshutdown;
if(!_2){
fluxProcessor.closeSession();
}
},closeSession:function(){
dwr.engine.setErrorHandler(this._handleExceptions);
dwr.engine.setOrdered(true);
Flux.close(this.sessionKey);
},ignoreExceptions:function(_3){
console.warn("FluxProcessor.ignoreExceptions():");
},dispatch:function(_4){
this._useLoadingMessage();
dwr.engine.setErrorHandler(this._handleExceptions);
dwr.engine.setOrdered(true);
Flux.dispatchEvent(_4,this.sessionKey,this.applyChanges);
return false;
},setControlValue:function(id,_6){
this.isDirty=true;
dwr.engine.setErrorHandler(this._handleExceptions);
this._useLoadingMessage();
dwr.engine.setOrdered(true);
dwr.engine.setErrorHandler(this._handleExceptions);
Flux.setUIControlValue(id,_6,this.sessionKey,this.applyChanges);
},setRepeatIndex:function(_7,_8){
this._useLoadingMessage();
dwr.engine.setErrorHandler(this._handleExceptions);
dwr.engine.setOrdered(true);
Flux.setRepeatIndex(_7,_8,this.sessionKey,this.applyChanges);
},_useLoadingMessage:function(){
dwr.engine.setPreHook(function(){
document.getElementById("indicator").className="xfEnabled";
});
dwr.engine.setPostHook(function(){
document.getElementById("indicator").className="xfDisabled";
});
},_handleExceptions:function(_9){
console.error(_9);
alert(_9);
},applyChanges:function(_a){
dojo.forEach(_a,function(_b){
switch(_b.type){
case "chiba-load-uri":
fluxProcessor._handleChibaLoadURI(_b);
break;
case "xforms-version-exception":
alert(_b.contextInfo.errorinformation);
break;
case "chiba-render-message":
fluxProcessor._handleChibaRenderMessage(_b);
break;
case "chiba-replace-all":
fluxProcessor._handleChibaReplaceAll();
break;
case "chiba-state-changed":
fluxProcessor._handleChibaStateChanged(_b);
break;
case "chiba-insert-repeatitem":
fluxProcessor._handleChibaInsertRepeatItem(_b);
break;
case "chiba-insert-itemset":
fluxProcessor._handleChibaInsertItemset(_b);
break;
case "chiba-item-deleted":
fluxProcessor._handleChibaItemDeleted(_b);
break;
case "chiba-index-changed":
fluxProcessor._handleChibaIndexChanged(_b);
break;
case "chiba-switch-toggled":
dijit.byId(_b.contextInfo.targetId).toggleCase(_b.contextInfo);
break;
case "upload-progress-event":
fluxProcessor._handleUploadProgressEvent(_b);
break;
case "xforms-submit-error":
console.warn("xforms-submit-error Event: ",_b);
break;
case "chiba-script-action":
eval(_b.contextInfo["script"]);
break;
case "xforms-focus":
fluxProcessor._handleXFormsFocus(_b);
break;
case "xforms-model-construct":
case "xforms-ready":
case "xforms-model-construct-done":
case "DOMActivate":
case "xforms-submit":
case "xforms-submit-done":
case "xforms-valid":
case "xforms-invalid":

break;
case "xforms-help":
fluxProcessor._handleShowHelp(_b);
break;
case "chiba-id-generated":
case "xforms-hint":
fluxProcessor._handleXFormsHint(_b);
break;
default:
console.warn("Event "+_b.type+" unknown [Event:",_b,"]");
break;
}
});
},_handleChibaLoadURI:function(_c){
if(_c.contextInfo.show=="replace"){
fluxProcessor.skipshutdown=true;
window.location.href=_c.contextInfo.uri;
}else{
if(_c.contextInfo.show=="new"){
window.open(_c.contextInfo.uri,"_chiba","menubar=yes,toolbar=yes,location=yes,directories=yes,fullscreen=no,titlebar=yes,hotkeys=yes,status=yes,scrollbars=yes,resizable=yes");
}else{
if(_c.contextInfo.show=="embed"){
var _d=_c.contextInfo.xlinkTarget;
var _e=dojo.byId(_d);
_e.innerHTML=_c.contextInfo.targetElement;
dojo.parser.parse(_e);
}else{
console.warn("chiba-load-uri show='"+_c.contextInfo.show+"' unknown!");
}
}
}
},_handleChibaRenderMessage:function(_f){
var _10=_f.contextInfo.message;
var _11=_f.contextInfo.level;
if(_11=="ephemeral"){
dijit.byId("chibaMessageToaster").setContent(_10,"message");
dijit.byId("chibaMessageToaster").show();
}else{
window.alert(_10);
}
},_handleChibaReplaceAll:function(){
fluxProcessor.skipshutdown=true;
var _12=window.location.href.lastIndexOf("#");
var _13=window.location.href.lastIndexOf("?");
var _14=window.location.href;
if(_12!=-1){
_14=window.location.href.substring(0,_12);
}
if(_13==-1){
_14+="?";
}
_14+="&submissionResponse&sessionKey="+fluxProcessor.sessionKey;
if(_12!=-1){
_14+=window.location.href.substring(_12);
}
window.open(_14,"_self");
},_handleChibaStateChanged:function(_15){
this.isDirty=true;
var _16=_15.contextInfo.targetId;
if(_15.contextInfo.targetName!=undefined&&_15.contextInfo.targetName=="repeat"){
var _17=dojo.query("*[repeatId='"+_16+"']");
var _18=dijit.byId(dojo.attr(_17[0],"id"));
_18.handleStateChanged(_15.contextInfo);
}else{
if(dijit.byId(_16)!=undefined){
dijit.byId(_16).handleStateChanged(_15.contextInfo);
}else{
if(dojo.byId(_16)!=undefined){
var _19=new chiba.ui.Control({contextInfo:_15.contextInfo},dojo.byId(_16));
_19.handleStateChanged(_15.contextInfo);
}else{
if(_15.contextInfo.parentId!=undefined&&_15.contextInfo.parentId!=""){
var _1a=dijit.byId(_15.contextInfo.parentId);
if(_1a!=undefined){
_1a.handleStateChanged(_15.contextInfo);
}else{
var _1b=dojo.byId(_15.contextInfo.parentId);
if(_1b==undefined){
console.warn("FluxProcessor chiba-state-changed  Warning: Neither Target nor its Parent does exist [xmlEvent",_15,"]");
}else{
if(dojo.hasClass(_1b,"xfSelectorItem")){
dijit.byId(dojo.attr(_1b.parentNode,"id")).handleStateChanged(_15.contextInfo);
}else{
console.warn("FluxProcessor chiba-state-changed: No handleStateChanged implementation availabled for contextinfo: ",_15.contextInfo);
}
}
}
}else{
console.warn("FluxProcessor chiba-state-changed Error: Processor does not know how to handle chiba-state-changed based on xmlEvent ",_15.contextInfo.targetId);
}
}
}
}
},_handleChibaInsertRepeatItem:function(_1c){
var _1d=dojo.query("*[repeatId='"+_1c.contextInfo.targetId+"']");
var _1e=dijit.byId(dojo.attr(_1d[0],"id"));
_1e.handleInsert(_1c.contextInfo);
},_handleChibaInsertItemset:function(_1f){
if(dijit.byId(_1f.contextInfo.targetId)!=undefined){
dijit.byId(_1f.contextInfo.targetId).handleInsert(_1f.contextInfo);
}else{
var _20=dojo.byId(_1f.contextInfo.targetId);
var _21;
var _22=dojo.attr(_20,"dojoType");
if(_22!=undefined&&_22=="chiba.ui.select.OptGroup"){
_21=new chiba.ui.select.OptGroup({contextInfo:_1f.contextInfo},_20);
}else{
if(_22!=undefined&&_22=="chiba.ui.select1.RadioItemset"){
_21=new chiba.ui.select1.RadioItemset({contextInfo:_1f.contextInfo},_20);
}else{
console.warn("FluxProcessor apply chiba-insert-itemset: Itemset Type "+_22+" not supported yet");
}
}
if(_21!=undefined){
_21.handleInsert(_1f.contextInfo);
}else{
console.warn("FluxProcessor apply chiba-insert-itemset: Error during itemset creation: ItemsetId"+_1f.contextInfo.targetId+" itemsetType: "+_22+" not supported yet");
}
}
},_handleChibaItemDeleted:function(_23){
if(_23.contextInfo.targetName=="itemset"){
dijit.byId(_23.contextInfo.targetId).handleDelete(_23.contextInfo);
}else{
if(_23.contextInfo.targetName=="repeat"){
var _24=dojo.query("*[repeatId='"+_23.contextInfo.targetId+"']");
dijit.byId(dojo.attr(_24[0],"id")).handleDelete(_23.contextInfo);
}
}
},_handleChibaIndexChanged:function(_25){
var _26=dojo.query("*[repeatId='"+_25.contextInfo.targetId+"']");
var _27=dijit.byId(dojo.attr(_26[0],"id"));
_27.handleSetRepeatIndex(_25.contextInfo);
},_handleUploadProgressEvent:function(_28){
var _29=_28.contextInfo.targetid;
if(dijit.byId(_29)!=undefined){
dijit.byId(_29).updateProgress(_28.contextInfo.progress);
}else{
console.warn("error during upload-progress-event: targetId "+_28.contextInfo.targetId+" does not exist");
}
},_handleXFormsFocus:function(_2a){
var _2b=_2a.contextInfo.targetId+"-value";
if(_2b!=undefined){
dojo.byId(_2b).focus();
}else{
console.warn("error during xforms-focus: targetId "+_2a.contextInfo.targetId+" does not exist");
}
},_handleXFormsHint:function(_2c){
var _2d=_2c.contextInfo.targetId;
var _2e=dojo.attr(dojo.byId(_2d+"-value"),"title");
dijit.byId("chibaMessageToaster").setContent(_2e,"message");
dijit.byId("chibaMessageToaster").show();
},_handleShowHelp:function(_2f){
fluxProcessor.currentControlId=_2f.contextInfo.targetId;
fluxProcessor.showHelp();
},fetchProgress:function(id,_31){
Flux.fetchProgress(id,_31,this.sessionKey,this.applyChanges);
},setLocale:function(_32){
Flux.setLocale(_32,this.sessionKey,this.applyChanges);
},showHelp:function(){
if(this.currentControlId==undefined||this.currentControlId==""||this.currentControlId==""){
console.warn("No Control selected to show help for");
return;
}
var _33=dojo.byId(this.currentControlId+"-help");
if(_33==undefined){
console.warn("No help available for Control Id: '"+this.currentControlId+"'");
return;
}
var _34=dojo.byId("helpTrigger");
var _35=document.createElement("div");
dojo.style(_35,{"display":"none"});
_34.appendChild(_35);
_35.innerHTML=_33.innerHTML;
var _36=new dojox.layout.FloatingPane({title:"Help",closeable:true,resizable:true,dockable:false},_35);
dojo.addClass(_36.domNode,"xfHelpPane");
_36.startup();
}});
}
