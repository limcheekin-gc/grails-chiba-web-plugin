/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.UIElementFactory"]){
dojo._hasResource["chiba.ui.UIElementFactory"]=true;
dojo.provide("chiba.ui.UIElementFactory");
dojo.require("chiba.ui.factory.InputElementFactory");
dojo.require("chiba.ui.OutputElementFactory");
dojo.require("chiba.ui.RangeElementFactory");
dojo.require("chiba.ui.SecretElementFactory");
dojo.require("chiba.ui.Select1ElementFactory");
dojo.require("chiba.ui.SelectElementFactory");
dojo.require("chiba.ui.SubmitElementFactory");
dojo.require("chiba.ui.TextareaElementFactory");
dojo.require("chiba.ui.TreeElementFactory");
dojo.require("chiba.ui.UploadElementFactory");
dojo.require("chiba.ui.input.Date");
dojo.declare("chiba.ui.UIElementFactory",null,{createWidget:function(_1,_2){
var _3=dojo.attr(_1,"controlType");
switch(_3){
case "input":
return new chiba.ui.InputElementFactory().createWidget(_1,_2);
case "output":
return new chiba.ui.OutputElementFactory().createWidget(_1,_2);
case "range":
return new chiba.ui.RangeElementFactory().createWidget(_1,_2);
case "secret":
return new chiba.ui.SecretElementFactory().createWidget(_1,_2);
case "select":
return new chiba.ui.SelectElementFactory().createWidget(_1,_2);
case "select1":
return new chiba.ui.Select1ElementFactory().createWidget(_1,_2);
case "textarea":
return new chiba.ui.TextareaElementFactory().createWidget(_1,_2);
case "trigger":
return new chiba.ui.TreeElementFactory().createWidget(_1,_2);
case "trigger":
return new chiba.ui.TriggerElementFactory().createWidget(_1,_2);
case "submit":
return new chiba.ui.SubmitElementFactory().createWidget(_1,_2);
case "upload":
return new chiba.ui.UploadElementFactory().createWidget(_1,_2);
default:
console.error("Unknown controlType: '"+_3);
break;
}
}});
}
