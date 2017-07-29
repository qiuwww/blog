var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
//var changed = require('gulp-changed');
//var uglify = require('gulp-uglify');

const SRC = 'src/**/*.js';
const DEST = 'build';
const WATCH_LIST = ['src/**/*.js', 'index.js'];

gulp.task('babelify', function(){
    return gulp.src(SRC)
        //.pipe(changed(DEST))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017'],
            plugins: [
                [
                    "transform-runtime", {
                        "polyfill": false, 
                        "regenerator": true
                    }
                ]
            ]
        }))
        .on('error', function(err){
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest(DEST))
        // uglify
});

gulp.task('watch', function(){
    return gulp.watch(WATCH_LIST, ['babelify']);
});

gulp.task('default', ['babelify', 'watch']);

