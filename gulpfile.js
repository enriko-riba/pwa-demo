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


var arrLibs = [
               'node_modules/systemjs/dist/system.js',
               'node_modules/jquery/dist/jquery.min.js',
               'node_modules/howler/dist/howler.core.min.js'
              ];
/**
 * Copies third party libraries from node_modules to '/dist/lib/' 
*/
gulp.task('copy-libs', function () {
gulp.src(arrLibs)
      .pipe(gulp.dest('./dist/lib/'));
});


/**
* Copies firebase libraries from node_modules/firebase to '/dist/lib/firebase/' 
*/
var arrFirebase = [ 
                    'node_modules/firebase/firebase-app.js',                    
                    'node_modules/firebase/firebase-database.js',                    
                    ];
gulp.task('copy-firebase', function () {
gulp.src(arrFirebase, {base:'node_modules/firebase/'})
.pipe(gulp.dest('./dist/lib/firebase/'));
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

/**
 * Copies ts files to '/dist/src' 
*/
gulp.task('copy-ts', function () {
  gulp.src('src/*.ts')
      .pipe(gulp.dest('./dist/src/'));
});

gulp.task('prepare-dist', ['copy-libs', 'copy-firebase', 'copy-src', 'copy-ts']);