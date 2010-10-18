/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.upload.Upload"]){
dojo._hasResource["chiba.ui.upload.Upload"]=true;
dojo.provide("chiba.ui.upload.Upload");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.Button");
dojo.declare("chiba.ui.upload.Upload",chiba.ui.ControlValue,{postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},_onFocus:function(){
this.inherited(arguments);
this.handleOnFocus();
},_onBlur:function(){
this.inherited(arguments);
},getControlValue:function(){
console.warn("chiba.ui.upload.Upload._getControlValue: Value: ");
},_handleSetControlValue:function(_1){
console.warn("chiba.ui.upload.Upload._handleSetControlValue: Value: ");
}});
}
