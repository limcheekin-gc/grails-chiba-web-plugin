/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.RepeatItem"]){
dojo._hasResource["chiba.ui.container.RepeatItem"]=true;
dojo.provide("chiba.ui.container.RepeatItem");
dojo.require("chiba.ui.container.Container");
dojo.require("dijit._Templated");
dojo.require("dijit.Dialog");
dojo.require("dojo.NodeList-fx");
dojo.declare("chiba.ui.container.RepeatItem",[chiba.ui.container.Container,dijit._Templated],{repeatId:"",protoype:"",position:"",animIn:null,animOut:null,dialogId:null,appearance:"",buildRendering:function(){
this.domNode=this.srcNodeRef;
if(dojo.attr(this.srcNodeRef,"appearance")!=undefined){
this.appearance=dojo.attr(this.srcNodeRef,"appearance");
}
},postCreate:function(){
dojo.connect(this.domNode,"onmouseover",this,"_onMouseOver");
dojo.connect(this.domNode,"onmouseout",this,"_onMouseOut");
dojo.connect(this.domNode,"onkeydown",this,"_onKeyDown");
},_onMouseOver:function(){
if(!dojo.hasClass(this.domNode,"xfRepeatIndexMouseOver")){
dojo.addClass(this.domNode,"xfRepeatIndexMouseOver");
}
},_onMouseOut:function(){
if(dojo.hasClass(this.domNode,"xfRepeatIndexMouseOver")){
dojo.removeClass(this.domNode,"xfRepeatIndexMouseOver");
}
},_onKeyDown:function(_1){
var _2;
if(window.event){
_2=window.event.keyCode;
}else{
if(_1){
_2=_1.which;
}
}
if(_2==38){
this.previousItem();
}else{
if(_2==40){
this.nextItem();
}
}
},handleStateChanged:function(_3){
this.inherited(arguments);
},_onBlur:function(){
this.inherited(arguments);
},_onFocus:function(){
if(dojo.hasClass(this.domNode,"xfRepeatIndexMouseOver")){
dojo.removeClass(this.domNode,"xfRepeatIndexMouseOver");
}
this.forceIndex();
this.inherited(arguments);
},forceIndex:function(){
if(dojo.hasClass(this.domNode,"xfRepeatIndex")){
return;
}
var _4=this.domNode.parentNode.childNodes;
dojo.forEach(_4,function(_5){
if(dojo.hasClass(_5,"xfRepeatIndex")){
dojo.removeClass(_5,"xfRepeatIndex");
}
if(dojo.hasClass(_5,"xfRepeatIndexPre")){
dojo.removeClass(_5,"xfRepeatIndexPre");
}
});
dojo.addClass(this.domNode,"xfRepeatIndexPre");
var _6=this._getXFormsPosition();
var _7=this._getRepeat();
fluxProcessor.setRepeatIndex(dojo.attr(_7.domNode,"repeatId"),_6);
},_getRepeat:function(){
var _8=this.domNode.parentNode;
while(!(dojo.hasClass(_8,"xfRepeat"))&&_8!=undefined){
_8=_8.parentNode;
}
return dijit.byId(dojo.attr(_8,"id"));
},_getXFormsPosition:function(){
dojo.attr(this.domNode,"selected","true");
var _9=this._getRepeat()._getRepeatItems();
var _a=0;
dojo.forEach(_9,function(_b,_c){
if(dojo.attr(_b,"selected")=="true"){
_b.removeAttribute("selected");
_a=_c+1;
}
});
return _a;
},nextItem:function(){
var _d=this._getXFormsPosition()+1;
var _e=this._getRepeat();
if(_d>_e._getSize()){
_d=_e._getSize();
}
fluxProcessor.setRepeatIndex(dojo.attr(_e.domNode,"repeatId"),_d);
},previousItem:function(){
var _f=this._getXFormsPosition()-1;
var _10=this._getRepeat();
if(_f<1){
_f=1;
}
fluxProcessor.setRepeatIndex(dojo.attr(_10.domNode,"repeatId"),_f);
},showRepeatItem:function(){
dojo.style(this.domNode,"opacity","1");
},hideRepeatItem:function(){
dojo.style(this.domNode,"opacity","0");
}});
}
