var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');

var directories = {
  source: {
    base: 'src/',
    script: 'src/scripts',
    style: 'src/styles'
  },
  test: 'test',
  server: 'server',
  distribution: 'static'
};

gulp.task('lint', function() {
  return gulp.src(['./*.js', directories.source.script + '/**/*.js', directories.test + '/**/*.js', directories.server + '/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('html', function() {
  return gulp.src(directories.source.base + '/index.html')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('js', function() {
  return browserify({
    entries: directories.source.script + '/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify.configure({
    optional: ['es7']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(directories.distribution));
});

gulp.task('js:production', function() {
  return browserify({
    entries: directories.source.script + '/main.js',
    extensions: ['.js'],
    debug: false
  })
  .transform(babelify.configure({
    optional: ['es7']
  }))
  .transform({
    global: true,
    sourcemap: false
  }, 'uglifyify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(directories.distribution));
});

gulp.task('sass', function() {
  return gulp.src(directories.source.style + '/main.scss')
    .pipe(sass({includePaths: ['./node_modules/bootstrap/scss']}).on('error', sass.logError))
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest(directories.distribution + '/'));
});

gulp.task('sass:production', function() {
  return gulp.src(directories.source.style + '/main.scss')
    .pipe(sass({includePaths: ['./node_modules/bootstrap/scss']}).on('error', sass.logError))
    .pipe(concatCss('style.css'))
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.dest(directories.distribution + '/'));
});

gulp.task('test', function() {
  return gulp.src(directories.test + '/**/*.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('build', function() {
  runSequence('lint', 'test', ['js', 'sass', 'html']);
});

gulp.task('build:production', function() {
  runSequence('lint', 'test', ['js:production', 'sass:production', 'html']);
});

gulp.task('watch', function() {
  return gulp.watch(
    [
      '*.js',
      directories.source.base + '/**/*',
      directories.test + '/**/*',
      directories.server + '/**/*.js'
    ],
    ['build']
  );
});

gulp.task('default', ['build', 'watch']);
