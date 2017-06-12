var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
	browserSync = require('browser-sync');

gulp.task('html', function() {
    livereload.listen();
    gulp.watch('src/*.html', function(file){
        console.log(file);
        gulp.src(file.path)
        .pipe(livereload());
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
		server:{
			baseDir:"./"
		}
	});
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/**', ['browser-sync']);
});

gulp.task('default',['watch'],['html'],['browser-sync']);


var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
	browserSync = require('browser-sync');

gulp.task('html', function() {
    livereload.listen();
    gulp.watch('src/*.html', function(file){
        console.log(file);
        gulp.src(file.path)
        .pipe(livereload());
    });
});

gulp.task('browser-sync', function() {
    browserSync.init({
		server:{
			baseDir:"./"
		}
	});
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/**', ['browser-sync']);
});

gulp.task('default',['watch'],['html'],['browser-sync']);