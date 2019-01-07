const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');

gulp.task('sass', function() {
  return gulp.src('assets/scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('sprite', function(done) {
  const spriteData = gulp.src('assets/img/icons/*.png')
    .pipe(spritesmith({
      imgName: 'assets/img/sprite.png',
      cssName: '_sprite.scss'
    }));
  spriteData.img.pipe(gulp.dest('./'));
  spriteData.css.pipe(gulp.dest('assets/scss/base'));
  done();
});

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    server: './',
    port: 5000,
    open: false
  });

  gulp.watch(['assets/scss/*.scss', 'assets/scss/**/*.scss'], gulp.series('sass'));
  gulp.watch('assets/js/*.js', gulp.series('js'));
  gulp.watch('*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('sprite', 'serve'));