/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.input.DateTime"]){
dojo._hasResource["chiba.ui.input.DateTime"]=true;
dojo.provide("chiba.ui.input.DateTime");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.input.DateTime",chiba.ui.ControlValue,{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this.setCurrentValue();
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
this.handleOnBlur();
},getControlValue:function(){
return null;
},_handleSetControlValue:function(){
console.warn("TBD: HandleState changed for DateTime");
}});
}
