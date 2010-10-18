/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select.CheckBoxGroup"]){
dojo._hasResource["chiba.ui.select.CheckBoxGroup"]=true;
dojo.provide("chiba.ui.select.CheckBoxGroup");
dojo.require("dijit._Widget");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.select.CheckBoxGroup",chiba.ui.ControlValue,{buildRendering:function(){
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
this.inherited(arguments);
var _1="";
dojo.query("*[checked]",this.domNode).forEach(function(_2){
_1+=_2.value+" ";
});
this.setCurrentValue(_1.replace(/\s+$/g,""));
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},getControlValue:function(){
var _3="";
dojo.query(".dijitCheckBoxChecked .dijitCheckBoxInput",this.domNode).forEach(function(_4){
_3=dijit.byId(dojo.attr(_4,"id")).getControlValue()+" "+_3;
});
return _3.replace(/\s+$/g,"");
},_handleSetControlValue:function(_5){
var _6=new Array();
_6=_5.split(" ");
dojo.query(".dijitCheckBoxInput",this.domNode).forEach(function(_7){
if(dojo.indexOf(_6,dijit.byId(_7.id).currentValue)!=-1){
dijit.byId(_7.id).setChecked(true);
}else{
dijit.byId(_7.id).setChecked(false);
}
});
},_setCheckBoxGroupValue:function(){
if(this.incremental){
this.xfControl.setControlValue(this.getControlValue());
}
},applyState:function(){
if(this.xfControl.isReadonly()){
this.setDisabled(true);
}else{
this.setDisabled(false);
}
},setDisabled:function(_8){
dojo.forEach(dojo.query(".dijitCheckBoxInput",this.domNode),function(_9){
var _a=dojo.attr(_9,"id");
var _b=dijit.byId(_a);
if(_b!=undefined){
_b.attr("disabled",_8);
}else{
_b=new chiba.ui.select.CheckBox({},_a);
_b.attr("disabled",_8);
}
});
}});
}
