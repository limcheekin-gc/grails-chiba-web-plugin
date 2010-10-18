/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.select.CheckBox"]){
dojo._hasResource["chiba.ui.select.CheckBox"]=true;
dojo.provide("chiba.ui.select.CheckBox");
dojo.require("dijit.form.FilteringSelect");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.form.CheckBox");
dojo.declare("chiba.ui.select.CheckBox",[chiba.ui.ControlValue,dijit.form.CheckBox],{selectWidgetId:"",value:"",selectWidget:null,postMixInProperties:function(){
this.inherited(arguments);
this.selectWidget=dijit.byId(this.selectWidgetId);
if(this.srcNodeRef!=undefined){
this.currentValue=dojo.attr(this.srcNodeRef,"value");
}
},onClick:function(_1){
this.inherited(arguments);
this.selectWidget._setCheckBoxGroupValue();
},getControlValue:function(){
return this.currentValue;
}});
}
