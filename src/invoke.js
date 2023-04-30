(function () {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	/*
	Invoke Action String By buggyj
	https://talk.tiddlywiki.org/t/is-it-possible-to-execute-an-action-widget-on-tiddler-load-render-open/3085/2
	*/

	exports.name = "invoke";

	exports.params = [
		{ name: "action" }
	];

	/*
	Run the macro
	*/
	exports.run = function (action) {
		// debugger;
		this.invokeActionString(action, this, {}, {});
		return "";
	};


})();