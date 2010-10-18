/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.InlineEditBox"]){
dojo._hasResource["chiba.ui.InlineEditBox"]=true;
dojo.provide("chiba.ui.InlineEditBox");
dojo.require("dijit.InlineEditBox");
dojo.require("chiba.ui.input.TextField");
dojo.declare("chiba.ui.InlineEditBox",dijit.InlineEditBox,{editor:"chiba.ui.input.TextField",postMixInProperties:function(){
this.inherited(arguments);
},save:function(){

this.editWidget.editWidget.setTextValue(this.editWidget.getValue());
this.inherited(arguments);
},edit:function(){

if(this.disabled||this.editing){
return;
}
this.editing=true;
var _1=(this.renderAsHtml?this.value:this.value.replace(/\s*\r?\n\s*/g,"").replace(/<br\/?>/gi,"\n").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&").replace(/&quot;/g,"\""));
var _2=dojo.doc.createElement("span");
dojo.place(_2,this.domNode,"before");
var ew=this.editWidget=new chiba.ui._InlineEditor({value:dojo.trim(_1),autoSave:this.autoSave,buttonSave:this.buttonSave,buttonCancel:this.buttonCancel,renderAsHtml:this.renderAsHtml,editor:this.editor,editorParams:this.editorParams,style:dojo.getComputedStyle(this.displayNode),save:dojo.hitch(this,"save"),cancel:dojo.hitch(this,"cancel"),width:this.width,chibaId:this.id},_2);
var _4=ew.domNode.style;
this.displayNode.style.display="none";
_4.position="static";
_4.visibility="visible";
this.domNode=ew.domNode;
setTimeout(function(){
if(ew.editWidget._resetValue===undefined){
ew.editWidget._resetValue=ew.getValue();
}
ew.focus();
},100);
}});
dojo.declare("chiba.ui._InlineEditor",[dijit._InlineEditor],{chibaId:null,postCreate:function(){
var _5=dojo.getObject(this.editor);
var _6=this.style;
var _7="line-height:"+_6.lineHeight+";";
dojo.forEach(["Weight","Family","Size","Style"],function(_8){
_7+="font-"+_8+":"+_6["font"+_8]+";";
},this);
dojo.forEach(["marginTop","marginBottom","marginLeft","marginRight"],function(_9){
this.domNode.style[_9]=_6[_9];
},this);
if(this.width=="100%"){
_7+="width:100%;";
this.domNode.style.display="block";
}else{
_7+="width:"+(this.width+(Number(this.width)==this.width?"px":""))+";";
}
this.editorParams.style=_7;
this.editorParams["displayedValue" in _5.prototype?"displayedValue":"value"]=this.value;
var _a=this.chibaId.substring(0,this.chibaId.length-7)+"-value";

this.editorParams["id"]=_a;
var ew=this.editWidget=new _5(this.editorParams,this.editorPlaceholder);
this.connect(ew,"onChange","_onChange");
this.connect(ew,"onKeyPress","_onKeyPress");
if(this.autoSave){
this.buttonContainer.style.display="none";
}
}});
}
