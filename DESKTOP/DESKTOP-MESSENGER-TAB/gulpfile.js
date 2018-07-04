'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');

 
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
	.pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./temp'));
});


gulp.task('minify', function() {
    gulp.src('./temp/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build'));
});


gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(server({
		defaultFile: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
    }));
});

 
gulp.task('start', function() {
	gulp.start('webserver');
	gulp.start('sass');
	setTimeout(function() {
		gulp.start('minify');
	}, 1500);
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./temp/*.css', ['minify']);
});


gulp.task( 'default', [ 'start' ] );