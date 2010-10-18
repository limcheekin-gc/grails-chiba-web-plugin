/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.TextareaElementFactory"]){
dojo._hasResource["chiba.ui.TextareaElementFactory"]=true;
dojo.provide("chiba.ui.TextareaElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.TextareaElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=null;
if(mediatype==undefined||mediatype=="text/html"){
_1=new chiba.ui.textarea.HtmlEditor({name:controlId+"-value","class":classValue,xfControlId:controlId},sourceNode);
}else{
if(mediatype==undefined||mediatype=="dojo"){
_1=new chiba.ui.textarea.DojoEditor({name:controlId+"-value","class":classValue,rows:5,cols:30,xfControlId:controlId},sourceNode);
}else{
_1=new chiba.ui.textarea.SimpleTextarea({name:controlId+"-value","class":classValue,xfControlId:controlId},sourceNode);
}
}
return _1;
}});
}
