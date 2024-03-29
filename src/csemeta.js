(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Information about this macro
*/

exports.name = "csemeta";

exports.params = [];

/*
Run the macro
*/
exports.run = function() {
	
	return JSON.stringify({
		version: $tw.wiki.getTextReference("$:/plugins/FSpark/TW5-CSE!!version","0.0.0"),
		lastCoreVersion: $tw.version,
		config: $tw.wiki.getTiddlerData("$:/plugins/FSpark/TW5-CSE/metaconfig.json")
	});
};

})();