/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.timeline.TimeLine"]){
dojo._hasResource["chiba.ui.timeline.TimeLine"]=true;
dojo.provide("chiba.ui.timeline.TimeLine");
dojo.require("chiba.ui.ControlValue");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("chiba.ui.timeline.TimeLine",chiba.ui.ControlValue,{timeLine:null,t1:null,resizeTimerID:null,templateString:"<div dojoAttachEvent=\"onresize:_onResize\" dojoAttachPoint=\"timelineNode\" style=\"height: 100px;\" class=\"xfTimeLine\"></div>\n\n",instanceId:null,modelId:null,adjustTimestamp:false,buildRendering:function(){
this.inherited(arguments);
this.instanceId=dojo.attr(this.srcNodeRef,"instanceId");
this.modelId=dojo.attr(this.srcNodeRef,"modelId");
},postMixInProperties:function(){
this.applyProperties(dijit.byId(this.xfControlId),this.srcNodeRef);
},postCreate:function(){
this.inherited(arguments);
this._createInitialTimeline();
},_createInitialTimeline:function(){
dijit.byId(this.modelId).getInstanceDocument(this.instanceId,dojo.hitch(this,this._updateTimeLine));
},adjustTimelineToDate:function(_1){
var _2=Timeline.DateTime.parseIso8601DateTime(_1);
this._adjustAndCreateTimeline(_2);
},_updateTimeLine:function(_3){
this.eventSource=new Timeline.DefaultEventSource();
var _4=dojo.query("data event",_3);
event=_4[_4.length-1];
var _5;
if(event==undefined){
var _6=dojo.query("*[value]",_3)[0];
_5=dojo.attr(_6,"value");
}else{
_5=dojo.attr(event,"start");
}
this.date=Timeline.DateTime.parseIso8601DateTime(_5);
this._adjustAndCreateTimeline(this.date);
this.eventSource.loadXML(_3,"");
},_adjustAndCreateTimeline:function(_7){
this.timeZone=0;
var _8={intervalUnit:Timeline.DateTime.DAY,eventSource:this.eventSource,date:_7,width:"80%",intervalPixels:200,timeZone:this.timeZone};
var _9={overview:true,intervalUnit:Timeline.DateTime.MONTH,date:_7,width:"10%",intervalPixels:100,timeZone:this.timeZone};
var _a={overview:true,intervalUnit:Timeline.DateTime.YEAR,date:_7,width:"10%",showEventText:false,intervalPixels:50,timeZone:this.timeZone};
var _b=[Timeline.createBandInfo(_8),Timeline.createBandInfo(_9),Timeline.createBandInfo(_a)];
_b[1].syncWith=0;
_b[1].highlight=true;
_b[2].syncWith=1;
_b[2].highlight=true;
var _c;
if(dijit.byId("timestampDijit-value")!=undefined){
_c=Timeline.DateTime.parseIso8601DateTime(dijit.byId("timestampDijit-value").getControlValue());
}else{
console.warn("No Timestamp Found, adjusted timestamp to date  "+_7);
_c=_7;
}
for(var i=0;i<_b.length;i++){
_b[i].decorators=[new Timeline.PointHighlightDecorator({date:_c,color:"#FFC080",opacity:50,cssClass:"p-highlight1"})];
}
this.timeLine=Timeline.create(this.timelineNode,_b);
},_handleSetControlValue:function(_e){
dijit.byId(this.modelId).getInstanceDocument(this.instanceId,dojo.hitch(this,this._updateTimeLine));
},_onResize:function(){
if(this.resizeTimerID==null){
this.resizeTimerID=window.setTimeout(function(){
this.resizeTimerID=null;
this.timeLine.layout();
},500);
}
}});
}
