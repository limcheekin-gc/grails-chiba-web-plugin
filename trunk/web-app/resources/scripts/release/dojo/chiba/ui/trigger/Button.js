/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.trigger.Button"]){
dojo._hasResource["chiba.ui.trigger.Button"]=true;
dojo.provide("chiba.ui.trigger.Button");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.Button");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.trigger.Button",[chiba.ui.ControlValue,dijit.form.Button],{buildRendering:function(){
this.inherited(arguments);
this.domNode=this.srcNodeRef;
var _1=dojo.attr(this.srcNodeRef,"source");
if(_1!=undefined&&_1!=""){
var _2=document.createElement("img");
dojo.attr(_2,"src",_1);
this.iconNode.appendChild(_2);
this.showLabel=false;
}
},postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},getControlValue:function(){
return dojo.attr(this.domNode,"value");
},_handleSetControlValue:function(_3){
console.warn("TBD: chiba.ui.trigger.Button._handleSetControlValue: Value: ",_3);
},onClick:function(e){
fluxProcessor.dispatch(this.xfControlId);
},_setLabel:function(_5){
dojo.byId(this.id+"_label").innerHTML=_5;
}});
}
