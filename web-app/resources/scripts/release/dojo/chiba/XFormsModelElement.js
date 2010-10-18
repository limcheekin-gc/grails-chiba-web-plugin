/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.XFormsModelElement"]){
dojo._hasResource["chiba.XFormsModelElement"]=true;
dojo.provide("chiba.XFormsModelElement");
dojo.require("dijit._Widget");
dojo.require("chiba.XFormsModelElement");
dojo.declare("chiba.XFormsModelElement",dijit._Widget,{constructor:function(){

},getInstanceDocument:function(_1,_2){
this._useLoadingMessage();
dwr.engine.setErrorHandler(fluxProcessor._handleExceptions);
XFormsModelElement.getInstanceDocument(this.id,_1,fluxProcessor.sessionKey,_2);
},rebuild:function(){
this._useLoadingMessage();
dwr.engine.setErrorHandler(fluxProcessor._handleExceptions);
XFormsModelElement.rebuild(this.id,fluxProcessor.getSessionKey(),null);
},recalculate:function(){
this._useLoadingMessage();
dwr.engine.setErrorHandler(fluxProcessor._handleExceptions);
XFormsModelElement.recalculate(this.id,fluxProcessor.getSessionKey(),null);
},revalidate:function(){
this._useLoadingMessage();
dwr.engine.setErrorHandler(fluxProcessor._handleExceptions);
XFormsModelElement.revalidate(this.id,fluxProcessor.getSessionKey(),null);
},refresh:function(){
this._useLoadingMessage();
dwr.engine.setErrorHandler(fluxProcessor._handleExceptions);
XFormsModelElement.refresh(this.id,fluxProcessor.getSessionKey(),null);
},_useLoadingMessage:function(){
dwr.engine.setPreHook(function(){
document.getElementById("indicator").className="xfEnabled";
});
dwr.engine.setPostHook(function(){
document.getElementById("indicator").className="xfDisabled";
});
}});
}
