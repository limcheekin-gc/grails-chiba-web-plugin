/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.widget.Time"]){
dojo._hasResource["chiba.widget.Time"]=true;
dojo.provide("chiba.widget.Time");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dojo.event.*");
dojo.require("dojo.html.*");
dojo.require("dojo.widget.Spinner");
dojo.require("dojo.widget.validate");
dojo.declare("chiba.XFTime",dojo.widget.HtmlWidget,{widgetType:"XFTime",templatePath:dojo.uri.dojoUri("../chiba/widget/templates/HtmlTime.html"),templateCssPath:dojo.uri.dojoUri("../chiba/widget/templates/HtmlTime.css"),id:"",name:"",value:"",timevalue:"00:00:00",hoursInputWidget:null,minutesInputWidget:null,secondsInputWidget:null,hoursInputNode:null,minutesInputNode:null,secondsInputNode:null,hoursNode:null,minutesNode:null,secondsNode:null,postMixInProperties:function(){
console.warn("Time.js not implemented yet");
},fillInTemplate:function(_1,_2){
var _3=this.value.substring((this.value.indexOf("T")+1),(this.value.indexOf(":")));
var _4=this.value.substring((this.value.indexOf(":")+1),(this.value.indexOf(":")+3));
var _5=this.value.substring((this.value.indexOf(":")+4),(this.value.indexOf(":")+6));



this.timevalue=_3+":"+_4+":"+_5;
this.hoursInputNode=document.createElement("span");
this.hoursNode.appendChild(this.hoursInputNode);
var _6={value:_3,delta:"01",min:"00",max:"23",seperator:"",maxlength:"2",widgetId:this.widgetId+"-hours"};
this.hoursInputWidget=dojo.widget.createWidget("AdjustableIntegerTextBox",_6,this.hoursInputNode);
var _7=document.createElement("span");
this.hoursInputNode.appendChild(_7);
var _8={inputWidgetId:this.widgetId+"-hours"};
var _9=dojo.widget.createWidget("Spinner",_8,_7);
this.minutesInputNode=document.createElement("span");
this.minutesNode.appendChild(this.minutesInputNode);
var _a={value:_4,delta:"1",min:"00",max:"59",seperator:"!",maxlength:"2",widgetId:this.widgetId+"-minutes"};
this.minutesInputWidget=dojo.widget.createWidget("AdjustableIntegerTextBox",_a,this.minutesInputNode);
var _b=document.createElement("span");
this.minutesInputNode.appendChild(_b);
var _c={inputWidgetId:this.widgetId+"-minutes"};
var _d=dojo.widget.createWidget("Spinner",_c,_b);
this.secondsInputNode=document.createElement("span");
this.secondsNode.appendChild(this.secondsInputNode);
var _e={value:_5,delta:"1",min:"00",max:"59",seperator:"!",maxlength:"2",widgetId:this.widgetId+"-seconds"};
this.secondsInputWidget=dojo.widget.createWidget("AdjustableIntegerTextBox",_e,this.secondsInputNode);
var _f=document.createElement("span");
this.secondsInputNode.appendChild(_f);
var _10={inputWidgetId:this.widgetId+"-seconds"};
var _11=dojo.widget.createWidget("Spinner",_10,_f);
dojo.connect(this.hoursNode,"onclick",this,"onSetTime");
dojo.connect(this.hoursNode,"onchange",this,"onSetTime");
dojo.connect(this.hoursNode,"onblur",this,"onSetTime");
dojo.connect(this.hoursNode,"onmouseout",this,"onSetTime");
dojo.connect(this.minutesNode,"onclick",this,"onSetTime");
dojo.connect(this.minutesNode,"onchange",this,"onSetTime");
dojo.connect(this.minutesNode,"onblur",this,"onSetTime");
dojo.connect(this.minutesNode,"onmouseout",this,"onSetTime");
dojo.connect(this.secondsNode,"onclick",this,"onSetTime");
dojo.connect(this.secondsNode,"onchange",this,"onSetTime");
dojo.connect(this.secondsNode,"onblur",this,"onSetTime");
dojo.connect(this.secondsNode,"onmouseout",this,"onSetTime");
},onSetTime:function(){
var t1=dijit.byId(this.widgetId+"-hours");
var t2=dijit.byId(this.widgetId+"-minutes");
var t3=dijit.byId(this.widgetId+"-seconds");
var _15=t1.getValue();
if(_15.length==1){
_15="0"+_15;
}
var _16=t2.getValue();
if(_16.length==1){
_16="0"+_16;
}
var _17=t3.getValue();
if(_17.length==1){
_17="0"+_17;
}
var _18=_15+":"+_16+":"+_17;
this.timevalue=_18;
DWREngine.setOrdered(true);
DWREngine.setErrorHandler(handleExceptions);
var _19=document.getElementById("chibaSessionKey").value;
Flux.setXFormsValue(updateUI,this.widgetId.substring(0,this.widgetId.length-6),_18,_19);
}},function onclick(){

},function onInputChange(){

},function onChange(){

});
}
