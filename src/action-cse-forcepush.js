(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var ForcePushWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
ForcePushWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
ForcePushWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
ForcePushWidget.prototype.execute = function() {
	this.actionFilter = this.getAttribute("$filter");
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
ForcePushWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$filter"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
ForcePushWidget.prototype.invokeAction = function(triggeringWidget,event) {
	if(this.actionFilter) {
		$tw.CSE.forcePush(this.actionFilter,this);
	}
	return true; // Action was invoked
};

exports["action-cse-forcepush"] = ForcePushWidget;

})();
