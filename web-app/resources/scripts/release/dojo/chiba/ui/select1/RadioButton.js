/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select1.RadioButton"]){
dojo._hasResource["chiba.ui.select1.RadioButton"]=true;
dojo.provide("chiba.ui.select1.RadioButton");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.CheckBox");
dojo.declare("chiba.ui.select1.RadioButton",[chiba.ui.ControlValue,dijit.form.RadioButton],{select1Dijit:null,buildRendering:function(){
if(dojo.attr(this.srcNodeRef,"selected")==undefined||dojo.attr(this.srcNodeRef,"selected")==""){
dojo.attr(this.srcNodeRef,"selected","false");
}
if(dojo.attr(this.srcNodeRef,"datatype")==undefined||dojo.attr(this.srcNodeRef,"datatype")==""){
dojo.attr(this.srcNodeRef,"datatype","radio");
}
this.currentValue=dojo.attr(this.srcNodeRef,"value");
if(dojo.attr(this.srcNodeRef,"parentId")!=undefined&&dojo.attr(this.srcNodeRef,"parentId")!=""){
this.parentId=dojo.attr(this.srcNodeRef,"parentId");
}
var _1=dojo.attr(this.srcNodeRef,"selected");
this.inherited(arguments);
if(_1!=undefined&&_1=="true"){
this.attr("checked",true);
}
},postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
if(dojo.attr(this.srcNodeRef,"incremental")==undefined||dojo.attr(this.srcNodeRef,"incremental")==""||dojo.attr(this.srcNodeRef,"incremental")=="true"){
this.incremental=true;
}else{
this.incremental=false;
}
},postCreate:function(){
this.select1Dijit=dijit.byId(this.parentId+"-value");
if(this.select1Dijit!=undefined){
dojo.connect(this,"_onClick",this.select1Dijit,"_setRadioGroupValue");
}else{
dojo.hitch(this,this.select1Dijit=new chiba.ui.Control({},this.parentId));
}
},getControlValue:function(){
return this.currentValue;
},_handleSetControlValue:function(_2){
this.currentValue=_2;
dojo.attr(this.focusNode,"value",_2);
if(this.select1Dijit!=undefined&&this.select1Dijit.currentValue==_2){
this.attr("checked",true);
}
}});
}
