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

// gulp.task('copy-html', function () {
//   gulp.src('./src/*.html')
//       .pipe(gulp.dest('./dist/'));
// });


var arrLibs = ['node_modules/firebase/firebase.js',
               'node_modules/firebase/firebase.js.map'
              ];
gulp.task('copy-libs', function () {
  gulp.src(arrLibs, {base: 'node_modules/'})
      .pipe(gulp.dest('./dist/lib/'));
});

var arrSrc = ['src/manifest.json', 
              'src/*.html',
              'src/sw.js'];
gulp.task('copy-src', function () {
  gulp.src(arrSrc, {base: 'src'})
      .pipe(gulp.dest('./dist/'));
});

gulp.task('prepare-dist', ['copy-libs', 'copy-src']);