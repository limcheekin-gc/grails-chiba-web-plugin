/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.util"]){
dojo._hasResource["chiba.ui.util"]=true;
dojo.provide("chiba.ui.util");
chiba.ui.util.showAtWidget=function(_1){
var _2=dojo.query("*[widgetId='"+_1+"-value']");
};
chiba.ui.util.getContainerByClass=function(_3,_4){
var _5=dojo.body();
while(_3&&_3!=_5&&!dojo.hasClass(_3,_4)){
_3=_3.parentNode;
}
if(dojo.hasClass(_3,_4)){
return _3;
}
return null;
};
chiba.ui.util.replaceClass=function(_6,_7,_8){
if(!_6||!_6.className){
return false;
}
var _9=_6.className;
var _a=" "+_9+" ";
var _b=" "+_7+" ";
var _c=" "+_8+" ";
if(_a.indexOf(_c)==-1){
var _d=_a.replace(new RegExp(_b),_c);
if(_d.indexOf(_c)==-1){
_d=_a+_8+" ";
}
_d=_d.slice(1,_d.length-1);
_6.className=_d;
return true;
}
return false;
};
chiba.ui.util.removeStyle=function(_e,_f){
if(_e==undefined||_f==undefined){
return false;
}
var _10=dojo.attr(_e,"style");
if(_10!=undefined&&_10.indexOf(_f)!=-1){
_10.replace(_f,"");
dojo.attr(_e,"style",_10);
return true;
}
return false;
};
}
