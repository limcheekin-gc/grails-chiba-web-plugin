/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.textarea.HtmlEditor"]){
dojo._hasResource["chiba.ui.textarea.HtmlEditor"]=true;
dojo.provide("chiba.ui.textarea.HtmlEditor");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.Editor");
dojo.declare("chiba.ui.textarea.HtmlEditor",[chiba.ui.ControlValue,dijit.Editor],{buildRendering:function(){
this.domNode=this.srcNodeRef;
this.setCurrentValue(this.srcNodeRef.innerHTML);
this._attachTemplateNodes(this.domNode);
},postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
dojo.connect(this,"onKeyPress",this,"_valueChanged");
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.setControlValue();
}
},getControlValue:function(){
return this.getValue();
},_valueChanged:function(_1){
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
this.setValue(_2);
}});
}
