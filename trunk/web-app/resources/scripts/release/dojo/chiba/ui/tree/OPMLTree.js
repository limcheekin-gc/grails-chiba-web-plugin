/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.tree.OPMLTree"]){
dojo._hasResource["chiba.ui.tree.OPMLTree"]=true;
dojo.provide("chiba.ui.tree.OPMLTree");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit.Tree");
dojo.require("dojox.data.OpmlStore");
dojo.declare("chiba.ui.tree.OPMLTree",chiba.ui.ControlValue,{rootLabel:"Root Node",templateString:"<div class=\"xfTree\"/>\n",instanceId:null,modelId:null,store:null,model:null,tree:null,id:null,controlValue:null,buildRendering:function(){
this.inherited(arguments);
this.instanceId=dojo.attr(this.srcNodeRef,"instanceId");
this.modelId=dojo.attr(this.srcNodeRef,"modelId");
this.id=dojo.attr(this.srcNodeRef,"id");
},postMixInProperties:function(){
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
dijit.byId(this.modelId).getInstanceDocument(this.instanceId,dojo.hitch(this,this._initialTreeCreation));
},_initialTreeCreation:function(_1){
this._createTree(_1);
},_createTree:function(_2){
this.store=this._createStore(_2);
this.model=this._createModel();
dojox.data.dom.removeChildren(this.domNode);
var _3=dojo.doc.createElement("div");
dojo.place(_3,this.domNode);
this.tree=this._createTreeImpl(_3);
this.tree.startup();
dojo.connect(this.tree,"onClick",this,"_treeClicked");
this.treeCreated();
},_createStore:function(_4){
return new dojox.data.OpmlStore({jsid:this.id+"-store",url:"",data:_4});
},_createModel:function(){
return new dijit.tree.ForestStoreModel({jsid:this.id+"-model",store:this.store,query:{},rootId:this.rootLabel,rootLabel:this.rootLabel});
},_createTreeImpl:function(_5){
return new dijit.Tree({model:this.model,jsid:this.id+"-tree"},_5);
},_treeClicked:function(_6,_7){
if(!(this.store.isItem(_6))){
return;
}
this.controlValue=this.store.getValue(_6,"text");
this.valueChanged(_6,_7);
},_handleSetControlValue:function(_8){
this.tree.destroy();
this.model.destroy();
this.store=undefined;
dijit.byId(this.modelId).getInstanceDocument(this.instanceId,dojo.hitch(this,this._createTree));
},valueChanged:function(_9,_a){
},getControlValue:function(){
return this.controlValue;
},getStoreValue:function(_b,_c){
return this.store.getValue(_b,_c);
},treeCreated:function(){
}});
}
