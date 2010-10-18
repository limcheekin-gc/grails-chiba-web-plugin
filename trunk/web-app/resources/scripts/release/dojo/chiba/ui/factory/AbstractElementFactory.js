/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.AbstractUIElementFactory"]){
dojo._hasResource["chiba.ui.AbstractUIElementFactory"]=true;
dojo.provide("chiba.ui.AbstractUIElementFactory");
dojo.require("chiba.ui.input.Date");
dojo.declare("chiba.ui.AbstractUIElementFactory",null,{controlType:"",dataType:"String",createWidget:function(_1,_2){
this.controlType=dojo.attr(_1,"controlType");
this.dataType=dojo.attr(_1,"dataType");
if(this.dataType!=undefined&&this.dataType.indexOf(":")!=-1){
this.dataType=this.dataType.substring(this.dataType.indexOf(":")+1,this.dataType.length);
}
var _3="xfValue";
if(dojo.attr(_1,"class")){
var _4=dojo.attr(_1,"class");
if(_4.indexOf("xfValue")==-1){
_3=_3+" "+_4;
}else{
_3=_4;
}
}
var _5=null;
if(this.controlType==undefined){
console.warn("UIElementFactory.createWidget: undefined controlType, Node: ",_1);
return _1;
}
return createWidgetForDatatype();
},createWidgetForDatatype:function(){
var _6=this.dataType.substr(0,1).toUpperCase()+this.dataType.substr(1);
var _7=eval("create"+_6+"Widget()");
if(_7!=null){
return _7;
}else{
return createDefaultWidget();
}
},createDefaultWidget:function(){
console.error("could not create widget for :"+this.controlType);
},createDateTimeWidget:function(){
return null;
},createTimeWidget:function(){
return null;
},createDateWidget:function(){
return null;
},createGYearMonthWidget:function(){
return null;
},createGYearWidget:function(){
return null;
},createGYearMonthDayWidget:function(){
return null;
},createGDayWidget:function(){
return null;
},createGMonthWidget:function(){
return null;
},createStringWidget:function(){
return null;
},createBooleanWidget:function(){
return null;
},createBase64BinaryWidget:function(){
return null;
},createHexBinaryWidget:function(){
return null;
},createFloatWidget:function(){
return null;
},createDecimalWidget:function(){
return null;
},createDoubleWidget:function(){
return null;
},createAnyURIWidget:function(){
return null;
},createQNameWidget:function(){
return null;
},createNormalizedStringWidget:function(){
return null;
},createTokenWidget:function(){
return null;
},createLanguageWidget:function(){
return null;
},createNameWidget:function(){
return null;
},createNCNameWidget:function(){
return null;
},createIDWidget:function(){
return null;
},createIDREFWidget:function(){
return null;
},createNMTOKENWidget:function(){
return null;
},createNMTOKENSWidget:function(){
return null;
},createIntegerWidget:function(){
return null;
},createNonPositiveIntegerWidget:function(){
return null;
},createNegativeIntegerWidget:function(){
return null;
},createLongWidget:function(){
return null;
},createIntWidget:function(){
return null;
},createShortWidget:function(){
return null;
},createByteWidget:function(){
return null;
},createNonNegativeIntegerWidget:function(){
return null;
},createUnsignedLongWidget:function(){
return null;
},createUnsignedIntWidget:function(){
return null;
},createUnsignedShortWidget:function(){
return null;
},createUnsignedByteWidget:function(){
return null;
},createPositiveIntegerWidget:function(){
return null;
}});
}
