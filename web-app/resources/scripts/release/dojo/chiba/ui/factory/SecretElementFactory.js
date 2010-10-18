/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.SecretElementFactory"]){
dojo._hasResource["chiba.ui.SecretElementFactory"]=true;
dojo.provide("chiba.ui.SecretElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.SecretElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=sourceNode.innerHTML;
var _2=new chiba.ui.secret.Secret({name:controlId+"-value",value:_1,"class":classValue,xfControlId:controlId},sourceNode);
return _2;
}});
}
