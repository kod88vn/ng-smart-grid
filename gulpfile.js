var moduleName = 'typist';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');
var webserver = require('gulp-webserver');
var angularTemplates = require('gulp-angular-templates');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('jshint', ['clean'], function() {
  gulp.src('/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('html', ['jshint', 'clean'], function () {
  gulp.src("src/**/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('css', ['clean'], function () {
  return gulp.src('./src/**/*.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('concat', ['html', 'clean'], function() {
  return gulp.src([
      './dist/templates/components/ngSmartGrid.html.js',
      './src/components/**/*.js'
  	])
    .pipe(plumber())
  	.pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});


gulp.task('compress', ['concat'], function() {
  return gulp.src('dist/app.js')
    .pipe(plumber())
    .pipe(uglify({
    	mangle: false
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'clean',
  'css',
	'compress'
]);

gulp.task('watch', function() {
  watch('./src/**/*.*', batch(function (events, done) {
    gulp.start('build', done);
  }));
});

gulp.task('webserver', ['build'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
    }));
});

gulp.task('serve', ['watch', 'webserver']);
