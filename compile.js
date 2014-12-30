#!/usr/bin/env node

var gaze = require("gaze");
var path = require("path");
var fs = require("fs");
var mkdirp = require("mkdirp");
var rimraf = require("rimraf");
var jsxTranform = require("react-tools").transform;

var returnArg = function (arg) {
  return arg;
};

var basepath = path.normalize(__dirname);
var inputdir = path.join(basepath, "app");
var outputdir = path.join(basepath, "compiled");

try {
  rimraf.sync(outputdir);
} catch (e) {}
fs.mkdirSync(outputdir);

var makeProcessor = function (transform) {
  return function (file) {

    // turn "require('../Application')" into "require('../Application')"
    var content = transform(fs.readFileSync(file, "utf8")).replace(/.jsx/g, "");

    // output the file at the same relative location but with ".js" extension
    var outpath = file.replace(inputdir, outputdir).replace(/.jsx/, ".js");
    
    mkdirp.sync(path.dirname(outpath));
    fs.writeFileSync(outpath, content);  
  };
};

var processJsx = makeProcessor(jsxTranform)
var noProcess = makeProcessor(returnArg);

var processFile = function (file) {
  if (/.jsx/.test(file)) {
    return processJsx(file);
  }
  if (/.js/.test(file) || /.json/.test(file)) {
    return noProcess(file);
  }
};



gaze("./app/**/*.*", { cwd: __dirname }, function (err, watcher) {

  this.on("all", function(event, filepath) {
    if (event == "removed") {
      return;
    }
    console.log("HERE");
    processFile(filepath);
  });

  this.watched(function (err, w) {

    for (var key in w) {
      w[key].forEach(processFile);
    }

    if (process.argv[2] !== "--watch") {
      process.exit();
    }
  });

});
