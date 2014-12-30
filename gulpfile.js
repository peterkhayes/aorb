var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var gulp        = require("gulp");
var gutil       = require("gulp-util");
var browserify  = require("browserify");
var reactify    = require("reactify");
var watchify    = require("watchify");
var uglify      = require("gulp-uglify");
var notify      = require("gulp-notify");
var less        = require("gulp-less")
var path        = require("path");
var simpleWatch = require("gulp-watch");
var liveReload  = require("gulp-livereload");

var buildDir = "./public/";

var ENTRY = "./app/main.jsx";

function handleErrors() {
  console.error(arguments[0]);
  this.emit("end");
}

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file, watch) {

  var props = {
    entries: [ENTRY], 
    debug: true, 
    cache: {}, 
    packageCache: {}
  };
  
  var bundler = browserify(props);

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(reactify);

  function rebundle() {
    var stream = bundler.bundle(props);
    return stream.on("error", notify.onError(function (err) {
      return err.message;
    }))
      .pipe(source("bundle.js"))
      .pipe(gulp.dest(buildDir));
  };

  bundler.on("update", function() {
    rebundle();
    gutil.log("Rebundle...");
  });

  return rebundle();
};

// LESS code
var styleSrc = "./public/insights/public/css/"
var lessSrc = styleSrc + "*.less";
var lessTask = function() {
  var l = less({
    paths: [ path.join(__dirname, "less", "includes") ]
  });
  l.on('error',function(e){
    gutil.log(e);
    l.end();
  });
  gulp.src(lessSrc)
    .pipe(l)
    .pipe(gulp.dest(styleSrc));
};


gulp.task("less", lessTask);

var watchLess = function(){
  gulp.watch(lessSrc, ['less'])
      .on("error", function(err){
        gutil.log("less error");
        gutil.log(err);
        watchLess();
      });
};

gulp.task("watch-less", watchLess);

gulp.task("build", function() {
  lessTask();
  buildScript(ENTRY, false)
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest(buildDir));
});

gulp.task("watch", function (){
  watchLess();
  return buildScript(ENTRY, true);
});
