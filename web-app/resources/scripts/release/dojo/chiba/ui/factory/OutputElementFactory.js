/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.OutputElementFactory"]){
dojo._hasResource["chiba.ui.OutputElementFactory"]=true;
dojo.provide("chiba.ui.OutputElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.OutputElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){

var _1=null;
var _2=sourceNode.innerHTML;
var _3=dataType;
var _4=dojo.attr(sourceNode,"appearance");
if(_4!=undefined&&_4.indexOf("ca")!=-1){
if(_4=="caLink"){
_3="anyURI";
}else{
_3=_4;

}
}
switch(_3.toLowerCase()){
case "casimiletimeline":

_1=new chiba.ui.input.TimeLine({name:controlId+"-value",checked:_2,"class":classValue,xfControlId:controlId},sourceNode);
_1.startup();
break;
case "caopmltree":

_1=new chiba.ui.tree.OPMLTree({name:controlId+"-value","class":classValue,xfControlId:controlId},sourceNode);
_1.startup();
break;
case "anyuri":
_1=new chiba.ui.output.Link({name:controlId+"-value",href:_2,"class":classValue,xfControlId:controlId},sourceNode);
break;
default:
if(mediatype==undefined||mediatype=="text"){
_1=new chiba.ui.output.Plain({name:controlId+"-value",value:_2,"class":classValue,xfControlId:controlId},sourceNode);
}else{
if(mediatype=="text/html"){
_1=new chiba.ui.output.Html({name:controlId+"-value",value:_2,"class":classValue,xfControlId:controlId},sourceNode);
}else{
if(mediatype.indexOf("image/")>-1){
_1=new chiba.ui.output.Image({name:controlId+"-value",src:_2,"class":classValue,xfControlId:controlId},sourceNode);
}else{
console.warn("UIElementFactory.createWidget(): unknown mediatype '"+mediatype+"' for output");
}
}
}
break;
}
}});
}
