/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.spade.Container"]){
dojo._hasResource["chiba.ui.spade.Container"]=true;
dojo.provide("chiba.ui.spade.Container");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.ContentPane");
dojo.declare("chiba.ui.spade.Container",[dijit.layout.ContentPane,dijit._Templated],{buildRendering:function(){
this.domNode=this.srcNodeRef;

var _1=dojo.doc.createElement("div");
_1.className="dndContainer";
_1.id=dojo.dnd.getUniqueId();
dojo.attr(_1,"dndType","element");
var _2=new dojo.dnd.Source(_1,{autosync:true});
var _3=dojo.doc.createElement("div");
_3.id=dojo.dnd.getUniqueId();
_3.className="dojoDndItem";
_3.backgroundColor="yellow";
_3.style.width="100%";
_3.style.height="20px";
_3.innerHTML=" ";
dojo.place(_1,this.domNode);
dojo.place(_3,_1);
this._attachTemplateNodes(this.domNode);
},postCreate:function(){
this.inherited(arguments);

}});
}
