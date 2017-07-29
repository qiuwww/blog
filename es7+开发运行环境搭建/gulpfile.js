// gulpfile.js

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');


const SRC = 'src/**/*.js';
const DEST = 'build';
const WATCH_LIST = ['src/**/*.js', 'index.js'];

// 错误处理
const notify = require("gulp-notify");


// 错误处理函数,错误处理要紧跟在编辑过程之后，不然编译出错在执行别的命令就会跳出来
let handleErrors = function(){
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
    this.emit();//提交
}



gulp.task('babelify', function(){
    return gulp.src(SRC)
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
		.on('error', handleErrors)   // 错误处理
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest(DEST))
});

gulp.task('watch', function(){
    return gulp.watch(WATCH_LIST, ['babelify']);
});

gulp.task('default', ['babelify', 'watch']);

