/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.output.Image"]){
dojo._hasResource["chiba.ui.output.Image"]=true;
dojo.provide("chiba.ui.output.Image");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.output.Image",chiba.ui.ControlValue,{src:"",alt:"",templateString:"<img src=\"${src}\" alt=\"${alt}\" class=\"xfValue\"></img>",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},getControlValue:function(){
return dojo.attr(this.domNode,"src");
},_handleSetControlValue:function(_1){
dojo.attr(this.domNode,"src",_1);
},applyState:function(){
}});
}
