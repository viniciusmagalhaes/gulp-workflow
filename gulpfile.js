var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload');


// Error
function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

// Scripts - uglify
gulp.task('scripts', function(){
    gulp.src('scripts/**/*.js')
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
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

//Watch
gulp.task('watch', function(){
    var server = livereload();
    gulp.watch('scripts/**/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('default', ['watch']);