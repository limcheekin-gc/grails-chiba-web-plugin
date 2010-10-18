/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select.MultiSelect"]){
dojo._hasResource["chiba.ui.select.MultiSelect"]=true;
dojo.provide("chiba.ui.select.MultiSelect");
dojo.require("dijit.form.FilteringSelect");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.MultiSelect");
dojo.declare("chiba.ui.select.MultiSelect",[chiba.ui.ControlValue,dijit.form.MultiSelect],{size:"",value:"",multiple:"",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
if(dojo.attr(this.srcNodeRef,"incremental")==undefined||dojo.attr(this.srcNodeRef,"incremental")==""||dojo.attr(this.srcNodeRef,"incremental")=="true"){
this.incremental=true;
}else{
this.incremental=false;
}
this.xfControl=dijit.byId(this.xfControlId);
if(this.size==""||this.size<1){
this.size=5;
}
},postCreate:function(){
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
},getControlValue:function(){
return this.getValue().join(" ");
},onChange:function(_1){
this.inherited(arguments);
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
var _3=new Array();
_3=_2.split(" ");
this._setValueAttr(_3);
}});
}
