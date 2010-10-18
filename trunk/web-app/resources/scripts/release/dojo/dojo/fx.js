/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.provide("dojo.fx.Toggler");
(function(){
var _1={_fire:function(_2,_3){
if(this[_2]){
this[_2].apply(this,_3||[]);
}
return this;
}};
var _4=function(_5){
this._index=-1;
this._animations=_5||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
dojo.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
dojo.extend(_4,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
dojo.disconnect(this._onAnimateCtx);
dojo.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=dojo.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=dojo.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_7,_8){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_8&&this._current.status()=="playing"){
return this;
}
var _9=dojo.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_a=dojo.connect(this._current,"onBegin",this,function(_b){
this._fire("onBegin",arguments);
}),_c=dojo.connect(this._current,"onPlay",this,function(_d){
this._fire("onPlay",arguments);
dojo.disconnect(_9);
dojo.disconnect(_a);
dojo.disconnect(_c);
});
if(this._onAnimateCtx){
dojo.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=dojo.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
dojo.disconnect(this._onEndCtx);
}
this._onEndCtx=dojo.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=dojo.connect(this._current,"onPause",this,function(_f){
this._fire("onPause",arguments);
dojo.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_10,_11){
this.pause();
var _12=this.duration*_10;
this._current=null;
dojo.some(this._animations,function(a){
if(a.duration<=_12){
this._current=a;
return true;
}
_12-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_12/this._current.duration,_11);
}
return this;
},stop:function(_14){
if(this._current){
if(_14){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=dojo.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
dojo.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
dojo.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
dojo.disconnect(this._onEndCtx);
}
}});
dojo.extend(_4,_1);
dojo.fx.chain=function(_17){
return new _4(_17);
};
var _18=function(_19){
this._animations=_19||[];
this._connects=[];
this._finished=0;
this.duration=0;
dojo.forEach(_19,function(a){
var _1b=a.duration;
if(a.delay){
_1b+=a.delay;
}
if(this.duration<_1b){
this.duration=_1b;
}
this._connects.push(dojo.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new dojo._Animation({curve:[0,1],duration:this.duration});
dojo.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop"],function(evt){
var _1d=this;
this._connects.push(dojo.connect(this._pseudoAnimation,evt,function(){
_1d._fire(evt,arguments);
}));
},this);
};
dojo.extend(_18,{_doAction:function(_1e,_1f){
dojo.forEach(this._animations,function(a){
a[_1e].apply(a,_1f);
});
return this;
},_onEnd:function(){
if(++this._finished==this._animations.length){
this._fire("onEnd");
}
},_call:function(_21,_22){
var t=this._pseudoAnimation;
t[_21].apply(t,_22);
},play:function(_24,_25){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_26,_27){
var ms=this.duration*_26;
dojo.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_27);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_2a){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
dojo.forEach(this._connects,dojo.disconnect);
}});
dojo.extend(_18,_1);
dojo.fx.combine=function(_2b){
return new _18(_2b);
};
})();
dojo.declare("dojo.fx.Toggler",null,{constructor:function(_2c){
var _t=this;
dojo.mixin(_t,_2c);
_t.node=_2c.node;
_t._showArgs=dojo.mixin({},_2c);
_t._showArgs.node=_t.node;
_t._showArgs.duration=_t.showDuration;
_t.showAnim=_t.showFunc(_t._showArgs);
_t._hideArgs=dojo.mixin({},_2c);
_t._hideArgs.node=_t.node;
_t._hideArgs.duration=_t.hideDuration;
_t.hideAnim=_t.hideFunc(_t._hideArgs);
dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));
dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true));
},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(_2e){
return this.showAnim.play(_2e||0);
},hide:function(_2f){
return this.hideAnim.play(_2f||0);
}});
dojo.fx.wipeIn=function(_30){
_30.node=dojo.byId(_30.node);
var _31=_30.node,s=_31.style,o;
var _34=dojo.animateProperty(dojo.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _35=dojo.style(_31,"height");
return Math.max(_35,1);
}
},end:function(){
return _31.scrollHeight;
}}}},_30));
dojo.connect(_34,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _34;
};
dojo.fx.wipeOut=function(_36){
var _37=_36.node=dojo.byId(_36.node);
var s=_37.style;
var o;
var _3a=dojo.animateProperty(dojo.mixin({properties:{height:{end:1}}},_36));
dojo.connect(_3a,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
dojo.connect(_3a,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _3a;
};
dojo.fx.slideTo=function(_3b){
var _3c=(_3b.node=dojo.byId(_3b.node));
var top=null;
var _3e=null;
var _3f=(function(n){
return function(){
var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_3e=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
_3e=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_3e+"px";
}
};
})(_3c);
_3f();
var _44=dojo.animateProperty(dojo.mixin({properties:{top:{end:_3b.top||0},left:{end:_3b.left||0}}},_3b));
dojo.connect(_44,"beforeBegin",_44,_3f);
return _44;
};
}
