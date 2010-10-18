/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.container.AccordionSwitchPane"]){
dojo._hasResource["chiba.ui.container.AccordionSwitchPane"]=true;
dojo.provide("chiba.ui.container.AccordionSwitchPane");
dojo.require("chiba.ui.container.Container");
dojo.declare("chiba.ui.container.AccordionSwitchPane",dijit.layout.AccordionPane,{caseId:"null",_onTitleClick:function(){
this.inherited(arguments);
var _1="t-"+this.caseId;
fluxProcessor.dispatch(_1);
}});
}
