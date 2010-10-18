/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.SelectElementFactory"]){
dojo._hasResource["chiba.ui.SelectElementFactory"]=true;
dojo.provide("chiba.ui.SelectElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.SelectElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=null;
var _2=dojo.attr(sourceNode,"appearance");
if(_2==undefined){
_2="minimal";
}
switch(_2.toLowerCase()){
case "minimal":
_1=new chiba.ui.select.MultiSelect({name:controlId+"-value",size:dojo.attr(sourceNode,"size"),multiple:true,"class":classValue,xfControlId:controlId},sourceNode);
break;
case "compact":
_1=new chiba.ui.select.MultiSelect({name:controlId+"-value",size:dojo.attr(sourceNode,"size"),multiple:true,"class":classValue,xfControlId:controlId},sourceNode);
break;
case "full":
_1=new chiba.ui.select.CheckBoxGroup({name:controlId+"-value","class":classValue,xfControlId:controlId},sourceNode);
break;
default:
break;
}
return _1;
}});
}
