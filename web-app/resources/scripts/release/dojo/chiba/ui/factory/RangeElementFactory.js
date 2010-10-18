/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.RangeElementFactory"]){
dojo._hasResource["chiba.ui.RangeElementFactory"]=true;
dojo.provide("chiba.ui.RangeElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.RangeElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=null;
var _2=dojo.attr(sourceNode,"value");
var _3=0;
var _4=10;
var _5=1;
if(dojo.attr(sourceNode,"start")!=""){
_3=eval(dojo.attr(sourceNode,"start"));
}
if(dojo.attr(sourceNode,"end")!=""){
_4=eval(dojo.attr(sourceNode,"end"));
}
if(dojo.attr(sourceNode,"step")!=""){
_5=eval(dojo.attr(sourceNode,"step"));
}
if(dojo.attr(sourceNode,"appearance")=="chiba:rating"){
_1=new chiba.ui.range.Rating({name:controlId+"-value",value:_2,"class":classValue,xfControlId:controlId,numStars:_4},sourceNode);
}else{
var _6=((_4-_3)/_5)+1;
var _7=document.createElement("div");
sourceNode.appendChild(_7);
var _8=new dijit.form.HorizontalRule({count:_6,container:"topDecoration",style:"height:4px;"},_7);
var _9=document.createElement("div");
sourceNode.appendChild(_9);
var _a=new dijit.form.HorizontalRuleLabels({count:5,style:"height:1.2em;font-size:75%;color:gray;",labels:[_3,_4]},_9);
_1=new chiba.ui.range.Slider({value:_2,name:controlId+"-value",slideDuration:0,minimum:_3,maximum:_4,discreteValues:_6,intermediateChanges:"true",showButtons:"true","class":classValue,xfControlId:controlId,style:"width:200px;"},sourceNode);
_1.startup();
_8.startup();
}
return widget;
}});
}
