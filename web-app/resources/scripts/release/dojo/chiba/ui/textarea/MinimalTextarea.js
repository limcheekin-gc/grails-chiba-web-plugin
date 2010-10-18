/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.textarea.MinimalTextarea"]){
dojo._hasResource["chiba.ui.textarea.MinimalTextarea"]=true;
dojo.provide("chiba.ui.textarea.MinimalTextarea");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.textarea.MinimalTextarea",chiba.ui.ControlValue,{rows:5,cols:40,templateString:"<div\n    ><textarea name=\"\" rows=\"${rows}\" cols=\"${cols}\" class=\"xfValue\" dojoAttachPoint=\"inputNode\" dojoAttachEvent=\"onchange:_valueChanged\"\n> </textarea></div>\n",postMixInProperties:function(){
this.inherited(arguments);

this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);


this.setInitialValue(this.srcNodeRef.innerHTML);
this.inputNode.value=this.srcNodeRef.innerHTML;
dojo.connect(this.domNode,"onkeypress",this,"_valueChanged");
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){

this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},getControlValue:function(){

return this.inputNode.value;
},_valueChanged:function(_1){
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
this._setValueAttr(_2);
}});
}
