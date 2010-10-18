/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.InputElementFactory"]){
dojo._hasResource["chiba.ui.InputElementFactory"]=true;
dojo.provide("chiba.ui.InputElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.InputElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
newWidget=new chiba.ui.input.TextField({name:controlId+"-value",value:xfValue,"class":classValue,xfControlId:controlId},sourceNode);
},createDateWidget:function(){
var _1=dojo.date.stamp.fromISOString(dojo.attr(sourceNode,"schemaValue"));
var _2=new chiba.ui.input.Date({name:controlId+"-value",value:_1,"class":classValue,xfControlId:controlId},sourceNode);
return _2;
},createBooleanWidget:function(){
var _3=sourceNode.innerHTML;
if(_3=="false"){
_3=undefined;
}
var _4=new chiba.ui.input.Boolean({name:controlId+"-value",checked:_3,"class":classValue,xfControlId:controlId},sourceNode);
return _4;
}});
}
