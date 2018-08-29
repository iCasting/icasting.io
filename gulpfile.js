'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulpfile = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Gulp task to minify CSS files
gulpfile.task('styles', function () {
    return gulpfile.src('./assets/scss/**/*.scss')
    // Compile SASS files
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))

        .pipe(concat('css.css'))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulpfile.dest('./dist'))
});

// Gulp task to minify JavaScript files
gulpfile.task('scripts', function() {
    return gulpfile.src('./assets/js/**/*.js')

        .pipe(concat('js.js'))
    // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulpfile.dest('./dist'))
});

// Gulp task to minify HTML files
gulpfile.task('pages', function() {
    return gulpfile.src(['./*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulpfile.dest('./dist'));
});

// Clean output directory
gulpfile.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulpfile.task('default', ['clean'], function () {
    runSequence(
        'styles',
        'scripts',
        'pages'
    );
});