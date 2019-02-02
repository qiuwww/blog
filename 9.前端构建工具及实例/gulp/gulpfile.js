// gulpfile.js

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
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
// 压缩文件
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css'); //压缩CSS为一行；
const rename = require('gulp-rename'); //配合uglify，压缩后添加一些标示，如min

const WATCH_LIST = ['src/**/*.js', 'src/*.js', 'src/js/template/*.ejs'];
const stylList = 'src/css/*.styl';

const handleErrors = function () {
  const args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'compile error',
    message: '<%=error.message %>'
  }).apply(this, args); //替换为当前对象
  this.emit(); //提交
}

// 编译stylus
gulp.task('stylus', function () {
  return gulp.src(stylList)
    // .pipe(sourcemaps.init())
    // `changed` 任务需要提前知道目标目录位置, 控制只有新改过的才再次压缩
    // .pipe(changed(stylList))
    .pipe(stylus())
    .pipe(base64())
    // .pipe(sourcemaps.write())
    //  .pipe(sourcemaps.write({
    //     includeContent: false,
    //     sourceRoot: 'src'
    // }))
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/css/'))
    .pipe(livereload());
});

gulp.task('watch-css', function () {
  livereload.listen();
  return gulp.watch(stylList, ['stylus']);
});

gulp.task('babelify', ['reload-js'], function (done) {
  webpack(config, function (err, stats) {
    console.log(err);
    if (done) {
      done();
    }
    // console.log(stats.toString());
  })
});

gulp.task('reload-js', function () {
  return gulp.src('dist/js/*.js')
    .pipe(livereload());
});

gulp.task('watch-js', function () {
  livereload.listen();
  return gulp.watch(WATCH_LIST, ['babelify']);
});

// 文件压缩与分发
const env = process.argv.slice(2);
console.log("env", env[2])

let pathBuild;
// 可以的

if (env[2] == 'build') {
  pathBuild = path.join(__dirname, 'build');
} else {
  pathBuild = path.join(__dirname, 'deploy');
}

gulp.task('default', ['babelify', 'stylus', 'watch-js', 'watch-css']);

gulp.task('des-js', function () {
  console.log(path.join(pathBuild, 'js'))
  return gulp.src(['dist/js/*.js', 'dist/js/*/*.js'])
    // 压缩文件
    .pipe(uglify())
    .pipe(gulp.dest(path.join(pathBuild, 'js')))
});

gulp.task('des-css', function () {
  return gulp.src(['dist/css/*.css', 'dist/css/*/*.css'])
    .pipe(minifyCss())
    .pipe(gulp.dest(path.join(pathBuild, 'css')))
})

gulp.task('des-img', function () {
  return gulp.src('dist/images/*')
    .pipe(gulp.dest(path.join(pathBuild, 'images')))
})

// 分发文件
gulp.task('min', ['des-js', 'des-css', 'des-img']);
