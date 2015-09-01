var postcss  = require('gulp-postcss'),
cssnext      = require("gulp-cssnext"),
gulp         = require('gulp'),
stylus       = require('gulp-stylus'),
csswring     = require('csswring'),
mqpacker     = require('css-mqpacker'),
autoprefixer = require('autoprefixer'),
rucksack     = require('gulp-rucksack'),
axis         = require('axis'),
plumber      = require('gulp-plumber');

var path = {
    css: './stylus/index.styl'
};

rucksack({
    fallbacks: true
});

gulp.task('css', function(){
    var processors = [
        csswring,
        mqpacker,
        autoprefixer({browsers: ['last 4 version']})
    ];

    return gulp.src( path.css )
    .pipe(plumber())
    .pipe(stylus( { use: axis() } ))
    .pipe(rucksack())
    .pipe(cssnext(processors))
    .pipe(gulp.dest('./css/'));
});


gulp.task('watch', function(){
    gulp.watch( path.css, ['css'] );
});


gulp.task('default', ['watch', 'css']);
