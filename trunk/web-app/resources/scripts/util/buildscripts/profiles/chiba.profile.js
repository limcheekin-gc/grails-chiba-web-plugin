dependencies = {
	//Strip all console.* calls except console.warn and console.error.
	stripConsole: "normal",

	layers: [
		{
			name: "../chiba/chiba.js",
			dependencies: [
                "chiba.FluxProcessor",
                "chiba.XFormsModelElement",                    
                "chiba.ui.UIElementFactory",
                "chiba.ui.Control",
                "chiba.ui.ControlValue",
                "chiba.ui.util",

                "chiba.ui.container.Container",
                "chiba.ui.container.Group",
                "chiba.ui.container.ContentPaneGroup",
                "chiba.ui.container.Repeat",
                "chiba.ui.container.RepeatItem",
                "chiba.ui.container.Switch",
                "chiba.ui.container.TabSwitch",

				"chiba.ui.input.Boolean",
				"chiba.ui.input.Date",
				"chiba.ui.input.TextField",

				"chiba.ui.output.Html",
				"chiba.ui.output.Image",
				"chiba.ui.output.Link",
				"chiba.ui.output.Plain",

                "chiba.ui.range.Rating",
				"chiba.ui.range.Slider",

                "chiba.ui.secret.Secret",

                "chiba.ui.select1.ComboBox",
                "chiba.ui.select1.ComboBoxOpen",
                "chiba.ui.select1.Plain",
                "chiba.ui.select1.RadioButton",
                "chiba.ui.select1.RadioGroup",
                "chiba.ui.select1.RadioItemset",

                "chiba.ui.select.CheckBox",
                "chiba.ui.select.CheckBoxGroup",
                "chiba.ui.select.CheckBoxItemset",
                "chiba.ui.select.MultiSelect",
                "chiba.ui.select.OptGroup",


                "chiba.ui.textarea.DojoEditor",
                "chiba.ui.textarea.HtmlEditor",
                "chiba.ui.textarea.SimpleTextarea",

                "chiba.ui.trigger.Button",
                "chiba.ui.trigger.LinkButton",

                "chiba.ui.upload.Upload",
                "chiba.ui.upload.UploadPlain",

/*
                "chiba.ui.tree.OpmlTree.js",
                "chiba.ui.timeline.TimeLine.js",
*/
                "dojox.widget.Toaster",
                "dojox.layout.FloatingPane"
			]
		},
        {
			name: "../chiba/accordion.js",
			dependencies: [
                "chiba.ui.container.AccordionSwitch",
                "chiba.ui.container.AccordionSwitchPane",
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "chiba", "../chiba" ]
	]
};
