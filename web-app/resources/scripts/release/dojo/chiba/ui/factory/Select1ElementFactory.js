/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.Select1ElementFactory"]){
dojo._hasResource["chiba.ui.Select1ElementFactory"]=true;
dojo.provide("chiba.ui.Select1ElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.Select1ElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=null;
var _2=dojo.attr(sourceNode,"appearance");
if(_2==undefined){
_2="minimal";
}
var _3=dojo.attr(sourceNode,"selection");
if(_3==undefined){
_1=new chiba.ui.select1.ComboBoxOpen({name:controlId+"-value",size:dojo.attr(sourceNode,"size"),multiple:true,"class":classValue,xfControlId:controlId},sourceNode);
return _1;
}
switch(_2.toLowerCase()){
case "minimal":
_1=new chiba.ui.select1.ComboBox({name:controlId+"-value",value:"","class":classValue,xfControlId:controlId},sourceNode);
break;
case "compact":
_1=new chiba.ui.select1.Plain({name:controlId+"-value",size:dojo.attr(sourceNode,"size"),"class":classValue,xfControlId:controlId},sourceNode);
break;
break;
case "full":
_1=new chiba.ui.select1.RadioGroup({name:controlId+"-value","class":classValue,xfControlId:controlId},sourceNode);
break;
default:
break;
}
return _1;
}});
}
