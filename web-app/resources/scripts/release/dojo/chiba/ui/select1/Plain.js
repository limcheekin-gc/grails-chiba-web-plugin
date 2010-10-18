/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select1.Plain"]){
dojo._hasResource["chiba.ui.select1.Plain"]=true;
dojo.provide("chiba.ui.select1.Plain");
dojo.require("chiba.ui.ControlValue");
dojo.require("dojox.form.DropDownSelect");
dojo.declare("chiba.ui.select1.Plain",chiba.ui.ControlValue,{buildRendering:function(){
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
dojo.connect(this.domNode,"onchange",this,"_onChange");
this.setCurrentValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},_onChange:function(){
if(this.incremental){
this.setControlValue();
}
},getControlValue:function(){
var _1;
if(this.domNode.selectedIndex==undefined||this.domNode.selectedIndex==-1){
return "";
}
var _1=this.domNode.options[this.domNode.selectedIndex].value;
if(_1!=undefined){
return _1;
}else{
return "";
}
},displayValidity:function(_2){
if(_2){
dojo.removeClass(this.domNode,"caDisplayInvalid");
}else{
dojo.addClass(this.domNode,"caDisplayInvalid");
}
},applyState:function(){
if(this.xfControl.isReadonly()){
dojo.attr(this.domNode,"disabled","disabled");
}else{
this.domNode.removeAttribute("disabled");
}
},_handleSetControlValue:function(_3){
for(i=0;i<this.domNode.options.length;i++){
if(this.domNode.options[i].value==_3){
this.domNode.selectedIndex=i;
}
}
}});
}
