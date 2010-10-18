/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.output.Link"]){
dojo._hasResource["chiba.ui.output.Link"]=true;
dojo.provide("chiba.ui.output.Link");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.output.Link",[chiba.ui.ControlValue],{href:"",templateString:"<span><a href=\"${href}\" target=\"_blank\" dojoAttachPoint=\"containerNode\"></a></span>",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
if(dojo.byId(this.xfControl.id+"-label")!=undefined){
this.containerNode.innerHTML=dojo.byId(this.xfControl.id+"-label").innerHTML;
}
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},getControlValue:function(){
return this.containerNode.innerHTML;
},applyState:function(){
},_handleSetControlValue:function(_1){
dojo.attr(this.containerNode,"href",_1);
if(_1.indexOf("/")>0){
_1=_1.substring(_1.lastIndexOf("/")+1,_1.length);
}
if(_1.indexOf(".")>0){
_1=_1.substring(0,_1.lastIndexOf("."));
}
this.containerNode.innerHTML=_1;
},_setLabel:function(_2){
if(this.containerNode.innerHTML==""){
var _3=document.createTextNode(_2);
dojo.place(_3,this.containerNode);
}else{
this.containerNode.innerHTML=_2;
}
}});
}
