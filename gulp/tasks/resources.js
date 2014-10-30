'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');

module.exports = gulp.task('resources', function () {
  return gulp.src(config.paths.src.resources)
    .pipe(gulpif(release, gulp.dest(config.paths.dest.release.resources), gulp.dest(config.paths.dest.build.resources)));
});
