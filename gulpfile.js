/*jslint node: true */
"use strict";

var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-cssnano'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    minifyjs = require('gulp-uglify'),
    merge = require('merge-stream');

gulp.task('clean', function () {
    return gulp.src('./www/*', {read: false}).pipe(rimraf({ force: true}));
});

gulp.task('html', function () {
    return gulp.src('./src/index.html').pipe(gulp.dest('./www'));
});

gulp.task('vendor', function () {
    return merge(
        gulp.src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/bootstrap-notify/bootstrap-notify.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/jquery.cookie/jquery.cookie.js',
            './node_modules/nedb/browser-version/out/nedb.min.js',
            './node_modules/bluebird/js/browser/bluebird.min.js'
        ]).pipe(gulp.dest('./www/js')),
        gulp.src('./node_modules/knockout/build/output/knockout-latest.js')
            .pipe(rename('knockout.min.js'))
            .pipe(gulp.dest('./www/js'))
    );
});

gulp.task('js', function () {
    return browserify({
        entries: './src/js/index.js',
        debug: true
    })
        .transform('exposify', {
            expose: {
                'jquery': '$',
                'knockout': 'ko',
                'nedb': 'Nedb',
                'bluebird': 'Promise'
            }
        })
        .transform('stringify', {
            extensions: ['.html'],
            minify: true,
            minifyOptions: {
                removeComments: false
            }
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        //.pipe(minifyjs()) // uncomment for production
        .pipe(gulp.dest('./www/js'));
});

gulp.task('styles', function() {
    gulp.src('./src/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('css', function () {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./www/css'));
});

gulp.task('image', function () {
    return gulp.src('./resources/img/model.jpg').pipe(gulp.dest('./www/img'));
});

gulp.task('build', ['html', 'css', 'js', 'vendor', 'styles', 'image']);

gulp.task('default', ['clean'], function () {
    return gulp.start('build');
});
