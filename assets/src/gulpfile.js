const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')

//SCSS compiled
function compilaSass(){
    return gulp.src('./scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.stream());
}
gulp.task('sass', compilaSass);

function pluginsCss(){
    return gulp.src('./lib/css/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.stream())
}
gulp.task('pluginscss', pluginsCss);

//compila JS
function gulpJs(){
    return gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream());
}
gulp.task('alljs', gulpJs);

function pluginsJs(){
    return gulp.src(['./lib/js/aos.js', './lib/js/swiper-bundle.min.js', './lib/js/bootstrap.bundle.min.js', './lib/js/particles.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream())
}
gulp.task('pluginsJs', pluginsJs)

// Browser-Sync
function browser(){
    browserSync.init({
       proxy:"http://metaproduto.local"
    })
}
gulp.task('browser-sync', browser);


function watch(){
    gulp.watch('./scss/*.scss', compilaSass);
    gulp.watch('./lib/css/*.css',pluginsCss);
    gulp.watch('../../inc/pages/**/*.php').on('change',browserSync.reload);
    gulp.watch('*.php').on('change',browserSync.reload);
    gulp.watch('./js/*.js', gulpJs);
    gulp.watch('./lib/css/*.js', pluginsJs);
}


gulp.task('watch', watch)

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs', 'pluginsJs', 'pluginscss'))