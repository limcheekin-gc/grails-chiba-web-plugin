/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select1.RadioGroup"]){
dojo._hasResource["chiba.ui.select1.RadioGroup"]=true;
dojo.provide("chiba.ui.select1.RadioGroup");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.select1.RadioGroup",chiba.ui.ControlValue,{radioItems:null,buildRendering:function(){
this.domNode=this.srcNodeRef;
},postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
if(dojo.attr(this.srcNodeRef,"incremental")==undefined||dojo.attr(this.srcNodeRef,"incremental")==""||dojo.attr(this.srcNodeRef,"incremental")=="true"){
this.incremental=true;
}else{
this.incremental=false;
}
},postCreate:function(){
var _1=this.id;
dojo.query("*[controltype='radioButtonEntry']",this.domNode).forEach(function(_2){
var _3=dojo.attr(_2,"id");
var _4=[0];
dojo.query(".xfValue",_2).attr("name",_1);
var _5=new chiba.ui.Control({id:_3,value:dojo.attr(_2,"value")},_2);
_5.startup();
});
this.inherited(arguments);
this.setCurrentValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},_setRadioGroupValue:function(){
if(this.incremental){
this.setControlValue();
}
},getControlValue:function(){
var _6=dojo.query(".dijitRadioChecked .dijitCheckBoxInput",this.domNode)[0];
if(_6!=undefined){
return dijit.byId(dojo.attr(_6,"id")).getControlValue();
}else{
return "";
}
},_handleSetControlValue:function(_7){
var _8=dojo.query(".xfValue",this.domNode);
for(i=0;i<_8.length;i++){
var _9=dojo.attr(_8[i],"widgetId");
var _a=dijit.byId(_9);
var _b=_a.getControlValue();
if(_b==_7){
_a._setCheckedAttr(true);
}else{
_a._setCheckedAttr(false);
}
}
},applyState:function(){
var _c=dojo.query(".xfValue",this.domNode);
for(i=0;i<_c.length;i++){
var _d=dojo.byId(dojo.attr(_c[i],"widgetId"));
if(this.xfControl.isReadonly()&&_d!=undefined){
dojo.attr(_d,"disabled","disabled");
}else{
if(_d!=undefined){
_d.removeAttribute("disabled");
}
}
}
}});
}
