const gulp = require("gulp");
const gtw = require("gulp-tw");

const author = "FSpark";
const pluginName = "TW5-CSE";
const sources = {
    sass: "./src/**/*.scss",
    tiddlers: "./src/**/*.tid",
    javascript: ['./src/**/*.js', '!./src/override/**/*.js'],
    originCopy: ["./src/override/**/*.js", "./src/**/*.json", "./src/**/*.meta", "!./src/**/*.js.meta"],
    pluginInfo: "./src/plugin.info",
    metaBundle: ' ',
    output: `./plugins/${author}/${pluginName}`,
};

const gulpTw = gtw({ author, pluginName, sources });

// ==================================================
// ====================== TASKS =====================
// ==================================================

module.exports = {
    ...gulpTw
};