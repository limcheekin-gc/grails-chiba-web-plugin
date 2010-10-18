/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.XFormsStore"]){
dojo._hasResource["chiba.ui.XFormsStore"]=true;
dojo.provide("chiba.ui.XFormsStore");
dojo.require("dojox.data.XmlStore");
dojo.declare("chiba.ui.XFormsStore",dojox.data.XmlStore,{getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},getIdentity:function(_1){
return this.getValue(_1,"name");
},getIdentityAttributes:function(_2){
return ["name"];
},fetchItemByIdentity:function(_3){
var _4=dojo.byId("xfData");


}});
}
