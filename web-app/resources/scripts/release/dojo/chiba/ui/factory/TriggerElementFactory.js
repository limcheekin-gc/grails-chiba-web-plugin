/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.TriggerElementFactory"]){
dojo._hasResource["chiba.ui.TriggerElementFactory"]=true;
dojo.provide("chiba.ui.TriggerElementFactory");
dojo.require("chiba.ui.AbstractElementFactory");
dojo.declare("chiba.ui.TriggerElementFactory",chiba.ui.AbstractElementFactory,{createDefaultWidget:function(){
var _1=null;
if(dojo.attr(sourceNode,"appearance")=="minimal"){

_1=new chiba.ui.trigger.LinkButton({id:dojo.attr(sourceNode,"id"),name:dojo.attr(sourceNode,"name")+"-value",label:dojo.attr(sourceNode,"label"),"class":classValue,xfControlId:controlId},sourceNode);
}else{
_1=new chiba.ui.trigger.Button({id:dojo.attr(sourceNode,"id"),name:dojo.attr(sourceNode,"name")+"-value",label:dojo.attr(sourceNode,"label"),"class":classValue,xfControlId:controlId},sourceNode);
}
return _1;
}});
}
