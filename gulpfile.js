/* eslint-disable */

var gulp = require("gulp"),
    // eslint = require("gulp-eslint"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    // pump = require("pump"),
    cleanCSS = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    imageResize = require("gulp-image-resize");

//default task
gulp.task("default", function() {
  gulp.watch("sass/*.scss", ["styles"]);
  gulp.watch("css/*.css", ["minify-css"]);
});

//convert .scss into .css
gulp.task("styles", function() {
  gulp.src("sass/*.scss")
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ["last 2 versions"]
  }))
  .pipe(gulp.dest("./css"));
});

//minify .css
gulp.task("minify-css", function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest('./min-css'));
});

//minify .js
gulp.task('compress', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest('./min-js'));
});

//resize, convert and more...
gulp.task("toSmall", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 500,
      height: 400,
      imageMagick: true,
      upscale: true,
      quality: 0.5
    }))
    .pipe(rename(function (path) { path.basename += "-small"; }))
    .pipe(gulp.dest("img-responsive"));
});
gulp.task("toMedium", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 1000,
      height: 800,
      imageMagick: true,
      upscale: true,
      quality: 0.5
    }))
    .pipe(rename(function (path) { path.basename += "-med"; }))
    .pipe(gulp.dest("img-responsive"));
});
gulp.task("toLarge", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 1500,
      height: 1200,
      imageMagick: true,
      upscale: true,
      quality: 0.7
    }))
    .pipe(rename(function (path) { path.basename += "-large"; }))
    .pipe(gulp.dest("img-responsive"));
});
gulp.task("toSmallp", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 500,
      height: 400,
      imageMagick: true,
      upscale: true,
      quality: 0.5,
      format: "webp"
    }))
    .pipe(rename(function (path) { path.basename += "-small"; }))
    .pipe(gulp.dest("img-responsive"));
});
gulp.task("toMediump", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 1000,
      height: 800,
      imageMagick: true,
      upscale: true,
      quality: 0.5,
      format: "webp"
    }))
    .pipe(rename(function (path) { path.basename += "-med"; }))
    .pipe(gulp.dest("img-responsive"));
});
gulp.task("toLargep", function () {
  gulp.src("images/**/*.jpg")
    .pipe(imageResize({
      width : 1500,
      height: 1200,
      imageMagick: true,
      upscale: true,
      quality: 0.7,
      format: "webp"
    }))
    .pipe(rename(function (path) { path.basename += "-large"; }))
    .pipe(gulp.dest("img-responsive"));
});

gulp.task("resize", ["toSmall", "toMedium", "toLarge", "toSmallp", "toMediump", "toLargep"]);


/*
New resize task

var resizeTasks = [];

[500, 1000, 1500].forEach(function() {
  var resize = "to " + this;
  gulp.task(resize, function() {
    return gulp.src("images/*.jpg")
      .pipe(imageResize({
        width: this,
        height: this,
        imageMagick: true,
        upscale: true,
        quality: (function() {
          if (this > 1000) {
            return 0.7;
          } else {
            return 0.5;
          }
        })()
    }))
      .pipe(rename(function (path) { path.basename += "_" + this; }))
      .pipe(gulp.dest("img-responsive"))
      .pipe(webp()) //another plugin
      .pipe(gulp.dest("img-responsive"));
  })
  resizeTasks.push(resize);
});

gulp.task("resize", resizeTasks);*/
