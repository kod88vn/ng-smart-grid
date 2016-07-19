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

gulp.task('clean', function (done) {
  del([
    // 'dist'
  ], done());
});

gulp.task('jshint', function() {
  gulp.src('/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('html', ['jshint', 'clean'], function () {
  gulp.src("src/**/*.pug")
    .pipe(pug())
    .pipe(angularTemplates({
      module: 'ng-smart-input',
      standAlone: false
    }))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('css', ['clean'], function () {
  return gulp.src('./src/**/*.styl')
  .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('concat', ['html', 'clean'], function() {
  return gulp.src([
      'src/components/**/*.js',
      'dist/templates/*.js',
  	])
  	.pipe(concat('app.js'))
  	.pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['concat'], function() {
  return gulp.src('dist/app.js')
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
  return gulp.watch([
    './src/**/*.*'
  ], ['build']);
});

gulp.task('webserver', ['build'], function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true
    }));
});

gulp.task('serve', ['watch', 'build', 'webserver']);
