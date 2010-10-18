/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.FisheyeLite"]){
dojo._hasResource["chiba.ui.FisheyeLite"]=true;
dojo.provide("chiba.ui.FisheyeLite");
dojo.require("dijit._Widget");
dojo.require("dojox.widget.FisheyeLite");
dojo.declare("chiba.ui.FisheyeLite",dojox.widget.FisheyeLite,{durationIn:350,postCreate:function(){
this.inherited(arguments);
this._target=dojo.query(".xfControl",this.srcNodeRef)[0];
this._makeAnims();
this.connect(this.domNode,"onmouseover","show");
this.connect(this.domNode,"onmouseout","hide");
this.connect(this._target,"onclick","onClick");
}});
}
