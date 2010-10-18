/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.UIElementFactory"]){
dojo._hasResource["chiba.ui.UIElementFactory"]=true;
dojo.provide("chiba.ui.UIElementFactory");
dojo.require("chiba.ui.input.Date");
dojo.declare("chiba.ui.UIElementFactory",null,{createWidget:function(_1,_2){
var _3=dojo.attr(_1,"controlType");
var _4=dojo.attr(_1,"dataType");
if(_4!=undefined&&_4.indexOf(":")!=-1){
_4=_4.substring(_4.indexOf(":")+1,_4.length);
}
var _5="xfValue";
if(dojo.attr(_1,"class")){
var _6=dojo.attr(_1,"class");
if(_6.indexOf("xfValue")==-1){
_5=_5+" "+_6;
}else{
_5=_6;
}
}
var _7=null;
if(_3==undefined){
console.warn("UIElementFactory.createWidget: undefined controlType, Node: ",_1);
return _1;
}
var _8=dojo.attr(_1,"mediatype");
switch(_3){
case "input":
var _9=_4;
var _a=dojo.attr(_1,"appearance");
if(_a!=undefined&&_a.indexOf("ca")!=-1){
_9=_a;
}
switch(_9.toLowerCase()){
case "casimiletimeline":

_7=new chiba.ui.timeline.TimeLine({name:_2+"-value",checked:_b,"class":_5,xfControlId:_2},_1);
_7.startup();
break;
case "caopmltree":

_7=new chiba.ui.tree.Tree({name:_2+"-value","class":_5,xfControlId:_2},_1);
_7.startup();
break;
case "date":
var _b=dojo.attr(_1,"schemaValue");
if(_b!=undefined&&_b!=""){
_b=dojo.date.stamp.fromISOString(_b);
}else{
_b="";
}
_7=new chiba.ui.input.Date({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "boolean":
var _b=_1.innerHTML;
if(_b=="false"){
_b=undefined;
}
_7=new chiba.ui.input.Boolean({name:_2+"-value",checked:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
default:
var _b=_1.innerHTML;
_7=new chiba.ui.input.TextField({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
}
break;
case "output":
var _b=_1.innerHTML;
var _c=_4;
var _a=dojo.attr(_1,"appearance");
if(_a!=undefined&&_a.indexOf("ca")!=-1){
if(_a=="caLink"){
_c="anyURI";
}else{
_c=_a;

}
}
switch(_c.toLowerCase()){
case "anyuri":
if(_8==undefined||_8=="controlValue"||_8=="text"){
_7=new chiba.ui.output.Link({name:_2+"-value",href:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8.indexOf("image/")>-1){
_7=new chiba.ui.output.Image({name:_2+"-value",src:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8=="text/html"){
_7=new chiba.ui.output.Html({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
console.warn("UIElementFactory.createWidget(): output anyURI - unknown combination of attributes");
}
}
}
break;
default:
if(_8==undefined||_8=="controlValue"||_8=="text"){
_7=new chiba.ui.output.Plain({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8=="text/html"){
_7=new chiba.ui.output.Html({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8.indexOf("image/")>-1){
_7=new chiba.ui.output.Image({name:_2+"-value",src:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
console.warn("UIElementFactory.createWidget(): unknown mediatype '"+_8+"' for output");
}
}
}
break;
}
break;
case "range":
var _b=dojo.attr(_1,"value");
var _d=0;
var _e=10;
var _f=1;
if(dojo.attr(_1,"start")!=""){
_d=eval(dojo.attr(_1,"start"));
}
if(dojo.attr(_1,"end")!=""){
_e=eval(dojo.attr(_1,"end"));
}
if(dojo.attr(_1,"step")!=""){
_f=eval(dojo.attr(_1,"step"));
}
if(dojo.attr(_1,"appearance")=="chiba:rating"){
_7=new chiba.ui.range.Rating({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2,numStars:_e},_1);
}else{
var _10=((_e-_d)/_f)+1;
var _11=document.createElement("div");
_1.appendChild(_11);
var _12=new dijit.form.HorizontalRule({count:_10,container:"topDecoration",style:"height:4px;"},_11);
var _13=document.createElement("div");
_1.appendChild(_13);
var _14=new dijit.form.HorizontalRuleLabels({count:5,style:"height:1.2em;font-size:75%;color:gray;",labels:[_d,_e]},_13);
_7=new chiba.ui.range.Slider({value:_b,name:_2+"-value",slideDuration:0,minimum:_d,maximum:_e,discreteValues:_10,intermediateChanges:"true",showButtons:"true","class":_5,xfControlId:_2,style:"width:200px;"},_1);
_7.startup();
_12.startup();
}
break;
case "secret":
var _b=_1.innerHTML;
_7=new chiba.ui.secret.Secret({name:_2+"-value",value:_b,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "selectCheckBox":
_7=new chiba.ui.select.CheckBoxGroup({name:_2+"-value","class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "selectList":
_7=new chiba.ui.select.MultiSelect({name:_2+"-value",size:dojo.attr(_1,"size"),multiple:true,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "select1":
case "select1ComboBox":
_7=new chiba.ui.select1.ComboBox({name:_2+"-value",value:"","class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "select1ComboBoxOpen":
_7=new chiba.ui.select1.ComboBoxOpen({name:_2+"-value",size:dojo.attr(_1,"size"),multiple:true,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "select1List":
_7=new chiba.ui.select1.Plain({name:_2+"-value",size:dojo.attr(_1,"size"),"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "select1RadioButton":
_7=new chiba.ui.select1.RadioGroup({name:_2+"-value","class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
case "textarea":
if(dojo.attr(_1,"appearance")=="minimal"&&_8!="text/html"&&_8!="dojo"){
_7=new chiba.ui.textarea.MinimalTextarea({name:_2+"-value",rows:5,cols:40,"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8=="text/html"){
_7=new chiba.ui.textarea.HtmlEditor({name:_2+"-value","class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
if(_8=="dojo"){
_7=new chiba.ui.textarea.DojoEditor({name:_2+"-value","class":_5,rows:5,cols:30,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
_7=new chiba.ui.textarea.SimpleTextarea({name:_2+"-value","class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}
}
}
break;
case "minimalTrigger":
case "trigger":
if(dojo.attr(_1,"appearance")=="minimal"){
_7=new chiba.ui.trigger.LinkButton({id:dojo.attr(_1,"id"),name:dojo.attr(_1,"name")+"-value",label:dojo.attr(_1,"label"),"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}else{
_7=new chiba.ui.trigger.Button({id:dojo.attr(_1,"id"),name:dojo.attr(_1,"name")+"-value",label:dojo.attr(_1,"label"),"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
}
break;
case "submit":
console.warn("TBD create Submit control: ",_1);
break;
case "upload":
switch(_4){
case "base64":
case "base64Binary":
case "hexBinary":
case "anyURI":
_7=new chiba.ui.upload.UploadPlain({"class":_5,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
default:
console.warn("Upload ("+_2+"): unsupported datatype: ",_4);
}
break;
case "radio":
var _15=_1.name;
var _16=_1.value;
_7=new chiba.ui.select1.RadioButton({"class":_5,name:_15,value:_16,title:dojo.attr(_1,"title"),xfControlId:_2},_1);
break;
default:
console.warn("Unknown controlValue: '"+_3+"' for Control "+_2+"! Properties: ",_1);
break;
}
return _7;
}});
}
