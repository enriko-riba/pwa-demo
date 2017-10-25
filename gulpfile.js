'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('*.scss', ['sass']);
});


var depLinker = require('dep-linker');
gulp.task('link-dependencies', function () {
  return depLinker.linkDependenciesTo('./dist/lib');
});