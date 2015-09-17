var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var eslint = require('gulp-eslint');

var directories = {
  source: {
    base: 'src/',
    script: 'src/scripts',
    style: 'src/styles'
  },
  distribution: 'static'
};

gulp.task('lint', function() {
  return gulp.src(directories.source.script + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('html', function() {
  return gulp.src(directories.source.base + '/index.html')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('js', function () {
  return browserify({
    entries: directories.source.script + '/main.js',
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

gulp.task('js:production', function () {
  return browserify({
    entries: directories.source.script + '/main.js',
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

gulp.task('build', ['lint', 'js', 'sass', 'html']);

gulp.task('build:production', ['lint', 'js:production', 'sass:production', 'html']);

gulp.task('watch', function () {
  return gulp.watch(directories.source.base + '/**/*', ['build']);
});

gulp.task('default', ['build', 'watch']);
