var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var directories = {
  source: 'src',
  distribution: 'static'
};

gulp.task('build', function () {
  return browserify({
    entries: directories.source + '/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    optional: ["es7"]
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(directories.distribution));
});

gulp.task('build:production', function () {
  return browserify({
    entries: directories.source + '/main.js',
    extensions: ['.js'],
    debug: false
  })
  .transform(babelify.configure({
    optional: ["es7"]
  }))
  .transform({
    global: true,
    sourcemap: false
  }, 'uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(directories.distribution));
});

gulp.task('watch', function () {
  return gulp.watch('./' + directories.source + '/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
