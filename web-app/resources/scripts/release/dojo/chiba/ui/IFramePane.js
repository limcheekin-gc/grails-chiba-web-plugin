/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.IFramePane"]){
dojo._hasResource["chiba.ui.IFramePane"]=true;
dojo.provide("chiba.ui.IFramePane");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.layout.ContentPane");
dojo.declare("chiba.ui.IFramePane",dijit.layout.ContentPane,{_loadCheck:function(_1){
if(this.domNode.style.display!="none"&&this.isLoaded!=true){
dojo.connect(this.domNode,"onload",this,"hideProgressIndicator");
this.domNode.src=this.href;
this.isLoaded=true;
}
},hideProgressIndicator:function(){
this.domNode.style.background="white";
}});
}
