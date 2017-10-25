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




var arrLibs = ['node_modules/firebase/firebase.js',
               'node_modules/firebase/firebase.js.map'
              ];
/**
 * Copies third party libraries from node_modules to '/dist/lib/' 
*/
gulp.task('copy-libs', function () {
  gulp.src(arrLibs, {base: 'node_modules/'})
      .pipe(gulp.dest('./dist/lib/'));
});


var arrSrc = ['src/manifest.json', 
              'src/*.html',
              'src/sw.js'];
/**
 * Copies source files to '/dist/' 
*/
gulp.task('copy-src', function () {
  gulp.src(arrSrc, {base: 'src'})
      .pipe(gulp.dest('./dist/'));
});


gulp.task('prepare-dist', ['copy-libs', 'copy-src']);