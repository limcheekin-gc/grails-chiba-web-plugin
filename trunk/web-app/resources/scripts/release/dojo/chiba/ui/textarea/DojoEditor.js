/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.textarea.DojoEditor"]){
dojo._hasResource["chiba.ui.textarea.DojoEditor"]=true;
dojo.provide("chiba.ui.textarea.DojoEditor");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.Textarea");
dojo.declare("chiba.ui.textarea.DojoEditor",[chiba.ui.ControlValue,dijit.form.Textarea],{templateString:(dojo.isIE||dojo.isSafari||dojo.isFF)?((dojo.isIE||dojo.isSafari||dojo.isFF>=3)?"<fieldset id=\"${id}-textarea\" class=\"dijitInline\" dojoAttachPoint=\"styleNode\" waiRole=\"presentation\"><div dojoAttachPoint=\"editNode,focusNode,eventNode\" dojoAttachEvent=\"onpaste:_changing,oncut:_changing\" waiRole=\"textbox\" waiState=\"multiline-true\" contentEditable=\"true\"></div>":"<span id=\"${id}\" class=\"dijitReset\">"+"<iframe src=\"javascript:<html><head><title>${_iframeEditTitle}</title></head><body><script>var _postCreate=window.frameElement?window.frameElement.postCreate:null;if(_postCreate)_postCreate();</script></body></html>\""+" dojoAttachPoint=\"iframe,styleNode,stateNode\" dojoAttachEvent=\"onblur:_onIframeBlur\" class=\"dijitInline dijitInputField\"></iframe>")+"<textarea name=\"${name}\" value=\"${value}\" dojoAttachPoint=\"formValueNode\" style=\"display:none;\" autocomplete=\"off\"></textarea>"+((dojo.isIE||dojo.isSafari||dojo.isFF>=3)?"</fieldset>":"</span>"):"<textarea id=\"${id}-textarea\" name=\"${name}\" value=\"${value}\" dojoAttachPoint=\"formValueNode,editNode,focusNode,styleNode\">"+dojo.isFF+"</textarea>",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
dojo.connect(this.domNode,"onkeypress",this,"_valueChanged");
},_onFocus:function(){
this.inherited(arguments);
},_onBlur:function(){
this.inherited(arguments);
if(!this.incremental){
this.handleOnBlur();
}
},getControlValue:function(){
return this._getValueAttr();
},_valueChanged:function(_1){
if(this.incremental){
this.setControlValue();
}
},_handleSetControlValue:function(_2){
this._setValueAttr(_2);
}});
}
