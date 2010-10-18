/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["chiba.ui.secret.Secret"]){
dojo._hasResource["chiba.ui.secret.Secret"]=true;
dojo.provide("chiba.ui.secret.Secret");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("dijit.form.TextBox");
dojo.require("chiba.ui.ControlValue");
dojo.declare("chiba.ui.secret.Secret",[chiba.ui.ControlValue,chiba.ui.input.TextField],{type:"password"});
}
