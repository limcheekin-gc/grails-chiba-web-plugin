/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.TabSwitch"]){
dojo._hasResource["chiba.ui.container.TabSwitch"]=true;
dojo.provide("chiba.ui.container.TabSwitch");
dojo.require("dijit.layout.TabContainer");
dojo.require("chiba.ui.container.Container");
dojo.declare("chiba.ui.container.TabSwitch",[chiba.ui.container.Container,dijit.layout.TabContainer],{topics:[],postCreate:function(_1){
this.inherited(arguments);
dojo.connect(this.tablist,"onSelectChild",this,"onTabClicked");
this.topics[0]=dojo.subscribe("/xf/invalid",this,"_handleInvalid");
this.topics[1]=dojo.subscribe("/xf/valid",this,"_handleValid");
},onTabClicked:function(_2){
var _3="t-"+dojo.attr(dojo.byId(_2.id),"caseid");
fluxProcessor.dispatch(_3);
},handleStateChanged:function(_4){
this.inherited(arguments);
},_handleInvalid:function(_5){
var _6=chiba.ui.util.getContainerByClass(_5.domNode,"xfCase");
if(_6==undefined){
return;
}
var _7=dijit.byId(dojo.attr(_6,"id"));
if(_7!=undefined){
var _8=dijit.byId(_7.controlButton.id);
if(dojo.byId(_8.id+"-image")==undefined){
var _9=document.createElement("img");
dojo.addClass(_9,"xfInvalidIcon");
dojo.attr(_9,"id",_8.id+"-image");
dojo.attr(_9,"src",dojo.moduleUrl("dijit","themes/tundra/images/warning.png"));
dojo.place(_9,_8.tabContent,3);
}
}
},_handleValid:function(_a){
var _b=chiba.ui.util.getContainerByClass(_a.domNode,"xfCase");
if(_b==undefined){
return;
}
var _c=dijit.byId(dojo.attr(_b,"id"));
if(_c!=undefined){
var _d=dijit.byId(_c.controlButton.id);
if(_d){
var _e=dojo.query(".caDisplayInvalid",_b);
if(_e.length==0&&dojo.byId(_d.id+"-image")!=undefined){
var _f=dojo.byId(_d.id+"-image");
_d.tabContent.removeChild(_f);
}
}
}
},toggleCase:function(_10){

}});
}
