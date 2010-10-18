/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select1.RadioItemset"]){
dojo._hasResource["chiba.ui.select1.RadioItemset"]=true;
dojo.provide("chiba.ui.select1.RadioItemset");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.ControlValue");
dojo.require("dojox.data.dom");
dojo.declare("chiba.ui.select1.RadioItemset",dijit._Widget,{values:"",handleStateChanged:function(_1){
if(_1.targetName=="label"){
dojo.byId(_1.parentId+"-label").innerHTML=_1.value;
}else{
if(_1.targetName=="value"){
dijit.byId(_1.parentId+"-value")._handleSetControlValue(_1.value);
}else{
console.warn("OptGroup.handleStateChanged: no action taken for contextInfo: ",_1);
}
}
},handleInsert:function(_2){
var _3=document.createElement("span");
dojo.addClass(_3,"xfSelectorItem");
dojo.addClass(_3,"xfEnabled");
dojo.addClass(_3,"xfReadWrite");
dojo.addClass(_3,"xfOptional");
dojo.addClass(_3,"xfValid");
dojo.attr(_3,"controltype","radioButtonEntry");
var _4=_2.generatedIds;
var _5=_4[_2.prototypeId];
dojo.attr(_3,"id",_5);
var _6=document.createElement("label");
dojo.addClass(_6,"xfLabel");
dojo.attr(_6,"id",_5+"-label");
dojo.attr(_6,"for",_5+"-value");
_6.innerHTML=_2.label;
var _7=this.domNode.parentNode;
while(!dojo.hasClass(_7,"xfSelect1")){
_7=_7.parentNode;
}
var _8=document.createElement("input");
dojo.addClass(_8,"xfValue");
dojo.attr(_8,"id",_5+"-value");
dojo.attr(_8,"selected","false");
dojo.attr(_8,"parentId",_7.id);
dojo.attr(_8,"name",_7.id+"-value");
dojo.attr(_8,"value","");
dojo.attr(_8,"datatype","radio");
dojo.attr(_8,"controltype","radio");
dojo.place(_8,_3);
dojo.place(_6,_3);
var _9=new chiba.ui.Control({contextInfo:_2},_3);
dojo.place(_3,this.domNode,_2.position);
},handleDelete:function(_a){

var _b=dojo.query(".xfSelectorItem",this.domNode)[_a.position-1];
this.domNode.removeChild(_b);
}});
}
