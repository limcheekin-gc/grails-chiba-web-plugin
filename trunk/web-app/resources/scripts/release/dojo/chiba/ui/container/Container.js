/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.Container"]){
dojo._hasResource["chiba.ui.container.Container"]=true;
dojo.provide("chiba.ui.container.Container");
dojo.require("dijit._Widget");
dojo.declare("chiba.ui.container.Container",dijit._Widget,{calculateClasses:function(){
if(!dojo.hasClass(this.domNode,"xfEnabled")&&!dojo.hasClass(this.domNode,"xfDisabled")){
dojo.addClass(this.domNode,"xfEnabled");
}
if(!dojo.hasClass(this.domNode,"xfOptional")||!dojo.hasClass(this.domNode,"xfRequired")){
dojo.addClass(this.domNode,"xfOptional");
}
if(!dojo.hasClass(this.domNode,"xfReadWrite")||!dojo.hasClass(this.domNode,"xfReadOnly")){
dojo.addClass(this.domNode,"xfReadWrite");
}
if(!dojo.hasClass(this.domNode,"xfValid")||!dojo.hasClass(this.domNode,"xfInvalid")){
dojo.addClass(this.domNode,"xfValid");
}
},handleStateChanged:function(_1){
if(_1["parentId"]){
this._handleHelperChanged(_1);
}else{
this.valid=_1["valid"];
this.readonly=_1["readonly"];
this.required=_1["required"];
this.relevant=_1["enabled"];
if(this.valid!=null){
this._handleSetValidProperty(eval(this.valid));
}
if(this.readonly!=null){
this._handleSetReadonlyProperty(eval(this.readonly));
}
if(this.required!=null){
this._handleSetRequiredProperty(eval(this.required));
}
if(this.relevant!=null){
this._handleSetEnabledProperty(eval(this.relevant));
}
}
},_handleSetValidProperty:function(){
if(this.valid=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfInvalid","xfValid");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfValid","xfInvalid");
}
},_handleSetReadonlyProperty:function(){
if(this.readonly=="false"){
chiba.ui.util.replaceClass(this.domNode,"xfReadOnly","xfReadWrite");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfReadWrite","xfReadOnly");
}
},_handleSetRequiredProperty:function(){
if(this.required=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfOptional","xfRequired");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfRequired","xfOptional");
}
},_handleSetEnabledProperty:function(){
var _2=this.id;
var _3=dojo.byId(_2+"-label");
if(this.relevant=="true"){
chiba.ui.util.replaceClass(this.domNode,"xfDisabled","xfEnabled");
chiba.ui.util.replaceClass(_3,"xfDisabled","xfEnabled");
}else{
chiba.ui.util.replaceClass(this.domNode,"xfEnabled","xfDisabled");
chiba.ui.util.replaceClass(_3,"xfEnabled","xfDisabled");
}
},_handleHelperChanged:function(_4){
switch(_4["targetName"]){
case "label":
this._setLabel(_4["value"]);
return;
case "help":
this._setHelp(_4["value"]);
return;
case "hint":
this._setHint(_4["value"]);
return;
case "alert":
this._setAlert(_4["value"]);
return;
}
},isRequired:function(){
if(dojo.hasClass(this.domNode,"xfOptional")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfRequired")){
return true;
}else{
console.error("No required state found");
}
}
},isReadonly:function(){
if(dojo.hasClass(this.domNode,"xfReadWrite")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfReadOnly")){
return true;
}else{
console.error("No readonly state found");
}
}
},isRelevant:function(){
if(dojo.hasClass(this.domNode,"xfDisabled")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfEnabled")){
return true;
}else{
console.error("No relevant state found");
}
}
},isValid:function(){
if(dojo.hasClass(this.domNode,"xfInvalid")){
return false;
}else{
if(dojo.hasClass(this.domNode,"xfValid")){
return true;
}else{
console.error("No validate state found for "+this.id);
}
}
},_setLabel:function(_5){
console.warn("TBD: Container._setHelp value:"+_5);
},_setHelp:function(_6){
console.warn("TBD: Container._setHelp value:"+_6);
},_setHint:function(_7){
console.warn("TBD: Container._setHint value:"+_7);
},_setAlert:function(_8){
console.warn("TBD: Container._setAlert value:"+_8);
},_setValueChild:function(_9){
console.warn("TBD: Container._setValueChild value:"+_9);
}});
}
