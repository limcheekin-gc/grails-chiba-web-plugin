/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select.OptGroup"]){
dojo._hasResource["chiba.ui.select.OptGroup"]=true;
dojo.provide("chiba.ui.select.OptGroup");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.ControlValue");
dojo.require("dojox.data.dom");
dojo.declare("chiba.ui.select.OptGroup",dijit._Widget,{values:"",handleStateChanged:function(_1){
if(_1.targetName=="label"){
dojo.byId(_1.parentId).innerHTML=_1.value;
}else{
if(_1.targetName=="value"){
dojo.attr(dojo.byId(_1.parentId),"value",_1.value);
if(dojo.hasClass(this.domNode.parentNode.localName=="select")){
var _2=dijit.byId(dojo.attr(this.domNode.parentNode,"id"));
if(_2.currentValue==_1.value){
_2._handleSetControlValue(_1.value);
}
}
}else{
console.warn("OptGroup.handleStateChanged: no action taken for contextInfo: ",_1);
}
}
},handleInsert:function(_3){
var _4=document.createElement("option");
_4.innerHTML=_3.label;
dojo.addClass(_4,"xfSelectorItem");
var _5=_3.generatedIds;
dojo.attr(_4,"id",_5[_3.prototypeId]);
dojo.attr(_4,"title","");
dojo.attr(_4,"value",_3.value);
dojo.place(_4,this.domNode,_3.position);
},handleDelete:function(_6){
var _7=dojo.query(".xfSelectorItem",this.domNode)[_6.position-1];
this.domNode.removeChild(_7);
}});
}
