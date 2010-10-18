/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.SubmitElementFactory"]){
dojo._hasResource["chiba.ui.SubmitElementFactory"]=true;
dojo.provide("chiba.ui.SubmitElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.SubmitElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
newWidget=new chiba.ui.Submit.TextField({name:controlId+"-value",value:xfValue,"class":classValue,xfControlId:controlId},sourceNode);
},createDateWidget:function(){
var _1=dojo.date.stamp.fromISOString(dojo.attr(sourceNode,"schemaValue"));
var _2=new chiba.ui.Submit.Date({name:controlId+"-value",value:_1,"class":classValue,xfControlId:controlId},sourceNode);
return _2;
},createBooleanWidget:function(){
var _3=sourceNode.innerHTML;
if(_3=="false"){
_3=undefined;
}
var _4=new chiba.ui.Submit.Boolean({name:controlId+"-value",checked:_3,"class":classValue,xfControlId:controlId},sourceNode);
return _4;
}});
}
