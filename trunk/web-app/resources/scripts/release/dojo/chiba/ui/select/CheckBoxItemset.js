/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select.CheckBoxItemset"]){
dojo._hasResource["chiba.ui.select.CheckBoxItemset"]=true;
dojo.provide("chiba.ui.select.CheckBoxItemset");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.ControlValue");
dojo.require("dojox.data.dom");
dojo.declare("chiba.ui.select.CheckBoxItemset",[chiba.ui.ControlValue,dijit._Widget],{values:"",handleStateChanged:function(_1){
if(_1.targetName=="label"){
dojo.byId(_1.parentId+"-label").innerHTML=_1.value;
}else{
if(_1.targetName=="value"){
dojo.attr(dojo.byId(_1.parentId+"-value"),"value",_1.value);
dijit.byId(_1.parentId+"-value").currentValue=_1.value;
}else{
console.warn("OptGroup.handleStateChanged: no action taken for contextInfo: ",_1);
}
}
},handleInsert:function(_2){
var _3=document.createElement("span");
var _4=_2.generatedIds;
var _5=_4[_2.prototypeId];
dojo.attr(_3,"id",_5);
dojo.addClass(_3,"xfSelectorItem");
var _6=this.domNode.parentNode;
while(!dojo.hasClass(_6,"CheckBoxGroup")){
_6=_6.parentNode;
}
var _7=new chiba.ui.select.CheckBox({id:_5+"-value","class":"xfValue",type:"checkbox",value:_2.value,selectWidgetId:_6.id,dojoType:"chiba.ui.select.CheckBox"});
dojo.place(_7.domNode,_3);
var _8=document.createElement("span");
dojo.addClass(_8,"xfLabel");
dojo.attr(_8,"id",_5+"-label");
_8.innerHTML=_2.label;
dojo.place(_8,_3);
dojo.place(_3,this.domNode,_2.position);
},handleDelete:function(_9){
var _a=dojo.query(".xfSelectorItem",this.domNode)[_9.position-1];
this.domNode.removeChild(_a);
}});
}
