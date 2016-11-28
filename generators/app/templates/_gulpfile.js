var gulp          = require('gulp');
var util          = require('gulp-util');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var series        = require('stream-series');
var inject        = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var cleanCSS      = require('gulp-clean-css');

var config = {
  appName: '<%= appName %>',
  jsFiles: 'app/**/*.js',
  templateFiles: 'app/**/*.html',
  vendorCSSFiles: 'app/assets/vendor/**/*.css',
  vendorJSFiles: 'app/assets/vendor/**/*.js',
  sassFiles: 'app/assets/sass/**/*.scss',
  assetsCSS: 'app/assets/css/**/*.css',
  production: !!util.env.production
};

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= errorTemplate %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('build', ['uglify', 'minify-css', 'html'], function() {
  var target = gulp.src('./dist/index.html');

  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read:false});

  target.pipe(inject(sources, {relative:true}))
    .pipe(gulp.dest('./dist'));

  browserSync.init(['./dist/**.**'], {
    server: "./dist",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src([config.vendorCSSFiles, config.assetsCSS])
    .pipe(concat('concat.css'))
    .pipe(rename(config.appName + '.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['browserify'], function() {
  return gulp.src(['main.js', config.vendorJSFiles])
    .pipe(concat('concat.js'))
    .pipe(rename(config.appName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', ['views'], function() {
  return browserify('./app/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src(config.sassFiles)
    .pipe(sass().on('error', interceptErrors))
    .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('inject', ['sass', 'browserify'], function() {
  var target = gulp.src('./index.html');

  var vendorStreamCSS = gulp.src(config.vendorCSSFiles, {read:false});

  var vendorStreamJS = gulp.src(config.vendorJSFiles, {read:false});

  var appStream = gulp.src(['./main.js', config.assetsCSS], {read:false});

  return target.pipe(inject(series(vendorStreamCSS, appStream, vendorStreamJS), {relative:true}))
    .pipe(gulp.dest('./'));
});

gulp.task('views', function() {
  return gulp.src(config.templateFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./app/config/'));
});

gulp.task('default', ['inject'], function() {

  browserSync.init(['./**/**.**'], {
    server: "./",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch(config.sassFiles, ['sass']);
  gulp.watch(config.templateFiles, ['views']);
  gulp.watch(config.assetsCSS, ['inject']);
  gulp.watch(config.vendorCSSFiles, ['inject']);
  gulp.watch(config.vendorJSFiles, ['inject']);
  gulp.watch(config.jsFiles, ['browserify']);
});