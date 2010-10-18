/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ConvexProcessor"]){
dojo._hasResource["chiba.ConvexProcessor"]=true;
dojo.provide("chiba.ConvexProcessor");
dojo.require("chiba.FluxProcessor");
dojo.declare("chiba.ConvexProcessor","chiba.FluxProcessor",{sessionKey:"",skipshutdown:false,isDirty:false,factory:null,currentControlId:"",unloadMsg:"You are about to leave this XForms application",constructor:function(){
this.factory=new chiba.ui.UIElementFactory();
},_buildUI:function(_1){
alert("ConvexProcessor.buildUI");
dojo.query("*",_1).forEach(function(_2){
if(_2.tagName.indexOf("XF:")!=-1){
}
});
},closeSession:function(){
alert("ConvexProcessor.closeSession");
},ignoreExceptions:function(_3){
alert("ConvexProcessor.ignoreException");
},dispatch:function(_4){
alert("ConvexProcessor.dispatch");
},setControlValue:function(id,_6){
alert("ConvexProcessor.setControlValue");
},setRange:function(id,_8){
alert("ConvexProcessor.setRange");
},setRepeatIndex:function(_9){
alert("ConvexProcessor.setRepeatIndex");
},_useLoadingMessage:function(){
alert("ConvexProcessor.useLoadingMessage");
},_handleExceptions:function(_a){
alert("ConvexProcessor.handleExceptions");
console.error(_a);
},setView:function(_b){
alert("ConvexProcessor.setView");
var _c=dojo.byId("xformsui");
_c.innerHTML=_b;
_c.className="enabled";
dojo.parser.parse(_c);
return true;
}});
}
