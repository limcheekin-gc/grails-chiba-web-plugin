/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.trigger.LinkButton"]){
dojo._hasResource["chiba.ui.trigger.LinkButton"]=true;
dojo.provide("chiba.ui.trigger.LinkButton");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.trigger.LinkButton",chiba.ui.ControlValue,{label:"",templateString:"<span class=\"xfValue\"\n    ><a href=\"#\" dojoAttachPoint=\"linknode\" onclick=\"return false;\" dojoAttachEvent=\"onclick:onClick\"></a\n></span>\n",postMixInProperties:function(){
this.inherited(arguments);
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
this.label=dojo.attr(this.srcNodeRef,"label");
},postCreate:function(){
this.linknode.innerHTML=this.label;
},onClick:function(e){
if(!(dojo.attr(this.domNode,"disabled")=="disabled")){
e.cancelBubble=true;
fluxProcessor.dispatch(this.xfControlId);
}
},applyState:function(){
if(this.xfControl.isReadonly()){
dojo.attr(this.domNode,"disabled","disabled");
}else{
this.domNode.removeAttribute("disabled");
}
},getControlValue:function(){
console.warn("TBD: chiba.ui.trigger.Button._getControlValue");
return dojo.attr(this.domNode,"value");
},_handleSetControlValue:function(_2){
console.warn("TBD: chiba.ui.trigger.Button._handleSetControlValue: Value: ",_2);
},_setLabel:function(_3){
console.warn("LinkButton._setLabel value:",_3," domNode: ",this.domNode);
}});
}
