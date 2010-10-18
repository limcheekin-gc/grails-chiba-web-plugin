/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.Repeat"]){
dojo._hasResource["chiba.ui.container.Repeat"]=true;
dojo.provide("chiba.ui.container.Repeat");
dojo.require("chiba.ui.container.Container");
dojo.require("dojo.NodeList-fx");
dojo.declare("chiba.ui.container.Repeat",chiba.ui.container.Container,{createdRepeatItems:null,itemsToRemoveList:[],postCreate:function(){
this.inherited(arguments);
this.createdRepeatItems=new Array();
},handleSetRepeatIndex:function(_1){
if(eval(_1.index)==0){
return;
}
this._removeRepeatIndexClasses();
var _2=dojo.query(".xfRepeatItem",this.domNode)[_1.index-1];
if(_2!=undefined){
dojo.addClass(_2,"xfRepeatIndex");
}
},setFocusOnChild:function(_3){
var _4=dojo.query(".xfValue",_3)[0];
if(_4!=undefined){
_4.focus();
}else{
var _5=dojo.query(".xfTrigger button")[0];
if(_5==undefined){
_5=dojo.query("input")[0];
if(_5==undefined){
_5=window.document.body.firstChild();
}
}
_5.focus();
}
},handleInsert:function(_6){
this._removeRepeatIndexClasses();
var _7=dojo.byId(_6.originalId+"-prototype");
var _8=_7.cloneNode(true);
this._replaceRepeatItemClasses(_8);
_6.repeatedSelects;
var _9="";
if(_6.prototypeId!=undefined){
_9=_6.generatedIds;
dojo.attr(_8,"id",_9[_6.prototypeId]);
}else{
if(_6.repeatedSelects){
_9=_6.repeatedSelects[0].generatedIds;
var _a=_6.repeatedSelects[0].generatedIds[0];
dojo.attr(_8,"id",_a);
}
}
this._replacePrototypeIds(_8,_9);
var _b=eval(_6.position);
var _c=this._createRepeatItem(_8,_b);
_c.showRepeatItem();
},_replaceRepeatItemClasses:function(_d){
dojo.removeClass(_d,"xfRepeatPrototype");
dojo.removeClass(_d,"xfDisabled");
dojo.addClass(_d,"xfRepeatItem");
dojo.addClass(_d,"xfEnabled");
dojo.addClass(_d,"xfRepeatIndexPre");
},_replacePrototypeIds:function(_e,_f){
dojo.query("*",_e).forEach(function(_10){
var _11=dojo.attr(_10,"id");
if(_11!=undefined&&_f[_11]!=undefined){
dojo.attr(_10,"id",_f[_11]);
}else{
if(_11!=undefined){
var _12;
var _13;
if(_11.indexOf("-value")!=-1){
_12=_11.substring(0,_11.indexOf("-value"));
_13="-value";
}else{
if(_11.indexOf("-label")!=-1){
_12=_11.substring(0,_11.indexOf("-label"));
_13="-label";
}else{
if(_11.indexOf("-hint")!=-1){
_12=_11.substring(0,_11.indexOf("-hint"));
_13="-hint";
}else{
if(_11.indexOf("-help")!=-1){
_12=_11.substring(0,_11.indexOf("-help"));
_13="-help";
}else{
if(_11.indexOf("-alert")!=-1){
_12=_11.substring(0,_11.indexOf("-alert"));
_13="-alert";
}else{
console.warn("Repeat._replacePrototypeIds Failure replaceing Id! Id to replace: ",_11," generatedIds: ",_f);
return;
}
}
}
}
}
var _14=_f[_12]+_13;
dojo.attr(_10,"id",_14);
}
}
});
},_createRepeatItem:function(_15,_16){
var _17=_16;
var _18=this._getSize();
var _19;
if(dojo.hasClass(this.domNode,"xfFullRepeat")){
_19="full";
}else{
_19="compact";
}
var _1a=new chiba.ui.container.RepeatItem({repeatId:this.id,appearance:_19},_15);
_1a.hideRepeatItem();
var _1b=null;
if(_16==1&&_18>0){
_1b=dojo.query(".xfRepeatItem",this.domNode)[0];
dojo.place(_1a.domNode,_1b,"before");
}else{
if(_16==1&&_18==0){
if(dojo.hasClass(this.domNode,"xfFullRepeat")){
dojo.place(_1a.domNode,this.domNode);
}else{
var _1c=dojo.query("tbody",this.domNode)[0];
if(_1c==undefined){
_1c=dojo.doc.createElement("tbody");
dojo.place(_1c,this.domNode);
}
dojo.place(_1a.domNode,_1c);
}
}else{
_1b=dojo.query(".xfRepeatItem",this.domNode)[_17-2];
dojo.place(_1a.domNode,_1b,"after");
}
}
return _1a;
},_getSize:function(){
return dojo.query(".xfRepeatItem",this.domNode).length;
},_getRepeatItems:function(){
return dojo.query(".xfRepeatItem",this.domNode);
},handleDelete:function(_1d){
var _1e=eval(_1d.position);
var _1f=dojo.query(".xfRepeatItem",this.domNode)[_1e-1];
var _20=_1f.length;
if(dojo.hasClass(this.domNode,"xfFullRepeat")){
this.domNode.removeChild(_1f);
}else{
dojo.query("tbody",this.domNode)[0].removeChild(_1f);
}
},handleStateChanged:function(_21){
var _22=eval(_21["enabled"]);
if(_22){
chiba.ui.util.replaceClass(this.domNode,"xfDisabled","xfEnabled");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfEnabled","xfDisabled");
}
},_removeRepeatIndexClasses:function(){
dojo.query(".xfRepeatIndexPre",this.domNode).forEach(function(_23){
dojo.removeClass(_23,"xfRepeatIndexPre");
});
dojo.query(".xfRepeatIndex",this.domNode).forEach(function(_24){
dojo.removeClass(_24,"xfRepeatIndex");
});
}});
}
