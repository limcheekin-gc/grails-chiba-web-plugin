/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.upload.UploadPlain"]){
dojo._hasResource["chiba.ui.upload.UploadPlain"]=true;
dojo.provide("chiba.ui.upload.UploadPlain");
dojo.require("chiba.ui.ControlValue");
dojo.require("chiba.FluxProcessor");
dojo.declare("chiba.ui.upload.UploadPlain",chiba.ui.ControlValue,{templateString:"<div\n    ><input id=\"inputFile\" type=\"file\" name=\"\" value=\"\" class=\"xfValue\"\n           dojoAttachPoint=\"inputNode\" dojoAttachEvent=\"onchange:onChange\"\n    /><div class=\"caProgressbar\" style=\"display:none;\" dojoAttachPoint=\"progress\"\n        ><div class=\"border\">\n            <div dojoAttachPoint=\"progressBackground\" class=\"background\"></div\n        ></div\n    ></div\n    ><input id=\"\"type=\"hidden\" value=\"\" dojoAttachPoint=\"fileName\"\n    ><iframe id=\"UploadTarget\" name=\"UploadTarget\" src=\"\" style=\"width:0px;height:0px;border:0\"></iframe>\n</div>\n",value:"",disabledNodes:new Array(),progress:null,progressBackground:null,fileId:"",fileValue:"",xfControlId:"",progressUpdate:null,postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
dojo.attr(this.inputNode,"name",dojo.attr(this.srcNodeRef,"name"));
dojo.attr(this.fileName,"id",dojo.attr(this.srcNodeRef,"fileId"));
dojo.attr(this.fileName,"value",dojo.attr(this.srcNodeRef,"fileValue"));
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
},getControlValue:function(){
console.warn("chiba.ui.upload.Upload._getControlValue");
},_handleSetControlValue:function(_1){
console.warn("chiba.ui.upload.Upload._handleSetControlValue");
},onChange:function(){

var _2=confirm("Really upload ?");
if(_2){
this._submitFile(this.inputNode);
}else{
this.inputNode.value="";
}
},updateProgress:function(_3){

if(_3!=0){
this.progressBackground.style.width=_3+"%";
}
if(_3==100||_3<0){
if(_3<0){
alert("Upload failed");
}
clearInterval(this.progressUpdate);
this.progress.style.display="none";
this.progressBackground.style.width=0;
dojo.query(".xfUpload.xfReadWrite .xfValue:disabled").forEach(function(_4){
_4.removeAttribute("disabled");
});
}
},_submitFile:function(){

var me=this.inputNode;
dojo.query(".xfUpload.xfReadWrite .xfValue").forEach(function(_6){
if(_6!=me){
dojo.attr(_6,"disabled","disabled");
}
});
this.progress.style.display="block";
var _7=this.inputNode.value;
var _8=_7.substring(_7.lastIndexOf("/")+1);
this.progressUpdate=setInterval("fluxProcessor.fetchProgress('"+this.xfControlId+"','"+_8+"')",500);
document.forms["chibaform"].target="UploadTarget";
document.forms["chibaform"].submit();
return true;
},applyState:function(){

if(this.xfControl.isReadonly()){
dojo.attr(this.inputNode,"disabled","disabled");
}else{
this.inputNode.removeAttribute("disabled");
}
}});
}
