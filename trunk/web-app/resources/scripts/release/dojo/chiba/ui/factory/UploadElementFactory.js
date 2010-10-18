/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.InputElementFactory"]){
dojo._hasResource["chiba.ui.InputElementFactory"]=true;
dojo.provide("chiba.ui.InputElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.InputElementFactory",chiba.ui.AbstractElementFactory,{createAnyURIWidget:function(){
return new chiba.ui.upload.UploadPlain({"class":classValue,xfControlId:controlId},sourceNode);
},createBase64BinaryWidget:function(){
return null;
},createHexBinary:function(){
return null;
}});
}
