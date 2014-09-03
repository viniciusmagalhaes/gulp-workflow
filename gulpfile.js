var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer');


// Error
function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

// Scripts - uglify
gulp.task('scripts', function(){
    gulp.src('scripts/**/*.js')
        .pipe(changed('scripts/**/*.js'))
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest('minscripts/'));
});

// Styles
gulp.task('styles', function(){
    gulp.src('scss/**/*.scss')
        .pipe(sass({
            style: 'compressed'
        }))
        .on('error', errorLog)
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Image - Compress
gulp.task('image', function(){
    gulp.src('images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('imagesmin'));
});

//Watch
gulp.task('watch', function(){
    var server = livereload();
    gulp.watch('scripts/**/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('images/**/*', ['image']);
});

gulp.task('default', ['watch']);