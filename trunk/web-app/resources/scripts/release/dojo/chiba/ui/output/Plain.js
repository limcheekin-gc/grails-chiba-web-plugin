/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.output.Plain"]){
dojo._hasResource["chiba.ui.output.Plain"]=true;
dojo.provide("chiba.ui.output.Plain");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.output.Plain",chiba.ui.ControlValue,{id:"",value:"",templateString:"<span id=\"${id}\" dojoAttachPoint=\"containerNode\"></span>",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},getControlValue:function(){
return this.containerNode.innerHTML;
},_handleSetControlValue:function(_1){
this.containerNode.innerHTML=_1;
},applyState:function(){
}});
}
