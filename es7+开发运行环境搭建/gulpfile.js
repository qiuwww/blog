// gulpfile.js

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// 错误处理
const notify = require("gulp-notify");

const webpack = require('webpack');
// var webpack = require('webpack-stream');
const config = require('./webpack.config.js');
// 错误处理函数,错误处理要紧跟在编辑过程之后，不然编译出错在执行别的命令就会跳出来

// 只是便已修改过的
const changed = require('changed');
const stylus = require('gulp-stylus');
const base64 = require('gulp-base64');
const livereload = require('gulp-livereload');

const WATCH_LIST = ['src/**/*.js', 'src/*.js'];
const stylList = 'src/css/*.styl';

let handleErrors = function(){
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
    this.emit();//提交
}

// 编译stylus
gulp.task('stylus', function(){
    return gulp.src(stylList)
    // .pipe(sourcemaps.init())
    // `changed` 任务需要提前知道目标目录位置, 控制只有新改过的才再次压缩
    // .pipe(changed(stylList))
    .pipe(stylus())
    .pipe(base64())
    // .pipe(sourcemaps.write())
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/css/'))
    .pipe(livereload());

});

gulp.task('watch-css', function(){
    livereload.listen();
    return gulp.watch(stylList, ['stylus']);
});

gulp.task('babelify', ['reload-js'], function(done){
    webpack(config, function(err, stats) {
        console.log(err);
        if(done){
            done();            
        }
        // console.log(stats.toString());
    })    
});

gulp.task('reload-js', function(){
    return gulp.src('dist/js/*.js')
        .pipe(livereload());
});

gulp.task('watch-js', function(){
    livereload.listen();
    return gulp.watch(WATCH_LIST, ['babelify']);
});

gulp.task('default', ['babelify', 'stylus', 'watch-js', 'watch-css']);

