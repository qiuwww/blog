	     /* 1.原始html,CSS,JS和图片分别在html,css,js,img目录内
	       2.如果有多个JS/CSS，则合并之后仍然分别在JS，CSS目录
	       3.如果只有单一JS/CSS，则分别压缩之后在opt_js,opt_css目录里
	       4.优化后的图片在opt_img里面
	       5.压缩后的html文件在opt_html里面
	    */
		
	    module.exports = function(grunt) {
	        'use strict';
         require('time-grunt')(grunt) ;
/*      do whatever you want with the stats*/ 

/*      be sure to let grunt know when to exit */
	        /* var mozjpeg = require('imagemin-mozjpeg');*/
	        grunt.initConfig({
		            /************       CSS文件处理     ************/
		            /*****    检查 CSS 语法  ****/
	          	  csslint: {
		                options: { 
		                    csslintrc: '.csslint'
		                         },
		                src: ['css/*.css']
		            },
	            /*    清理无用 CSS    */
	            uncss: {
	                dist: {
	                    files: {
	                        'opt_css/tidy.css': ['html/index.html']
	                    }
	                },
	                options: {
	                    report: 'gzip'
	                }
	            },
	            /****     压缩 CSS    ****/
	            cssmin: {
	                options: {
	                    report: 'gzip',
	                    keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
	                },
	                minify: {
	                    expand: true,
	                    cwd: 'css/',
	                    src: ['*.css'],
	                    dest: 'opt_css/',
	                    ext: '.min.css'
	                }
	            },
	            sass: {
	                dist: {
	                    files: [{
	                        expand: true,
	                        cwd: 'css/',
	                        src: ['*.scss'],
	                        dest: 'css/',
	                        ext: ['.css']
	                    }]
	                }
	            },
	            /************       CSS文件处理     ************/
	            /************       JS文件处理     ************/
	            /****      检查 js 语法    ****/
	            jshint: {
	                options: {
	                       jshintrc: '.jshint'
	                    },
	                files: {
	                    src: ['Gruntfile.js', 'js/*.js']
	                },
	          },
	            /****        最小化、混淆、合并 JavaScript 文件       ****/
	            uglify: {
	                target: {
	                    files: {
	                        'js/all_in_one.js': ['js/*.js']
	                    }
	                },
	                /*最小化、混淆所有 js/ 目录下的 JavaScript 文件*/
	                minjs: {
	                    files: [{
	                        expand: true,
	                        cwd: 'js/',
	                        src: ['**/*.js', '!**/*.min.js'],
	                        dest: 'opt_js/',
	                        ext: '.min.js'
	                    }]
	                },
	                options: {
	                    mangle: false, //不混淆变量名
	                    // preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
	                    report: 'gzip'
	                }
	            },
	            /************       JS文件处理     ************/
	            /************       图片文件处理     ************/
	            /****        压缩优化图片大小        ****/
	            imagemin: {
	                dist: {
	                    options: {
	                        optimizationLevel: 7,
	                        progressive: true,
	                        interlaced: true,
	                        pngquant: { quality: "65-80" }
	                    },
	                    files: [{
	                        expand: true,
	                        cwd: 'img',
	                        src: ['**/*.{png,jpg,jpeg|gif|svg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
	                        dest: 'opt_img/' // 优化后的图片保存位置，默认覆盖
	                    }]
	                }
	            },
	            /************       图片文件处理     ************/
	            /************      CSS JS 文件处理     ************/
	            /****    合并 JS/CSS 文件    ****/
	            concat: {
	                /****    合并 CSS 文件    ****/
	                css: {
	                    // src: ['css/*.css' ],
	                    src: ['opt_css/**/*.css'],
	                    /* 根据目录下文件情况配置 */
	                    dest: 'opt_css/all_in_one.min.css'
	                },
	                /****    合并 JS 文件    ****/
	                js: {
	                    src: ['js/**/*.js'],
	                    /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
	                    dest: 'js/all_in_one.js'
	                }
	            },
	            /****    合并 JS/CSS 文件    ****/
	            /************      CSS JS 文件处理     ************/
	            /************     HTML 文件处理     ************/
	            /*压缩HTML*/
	            htmlmin: {
	                options: {
	                    ignoreCustomFragments: [/{dede:[\s\S]*?}/, /\[field:[\s\S]*?\/]/, /{\/dede:[\s\S]*?}/, /<\?[\s\S]*?\?>/],
	                    ignoreCustomComments: [/<!--[\s]{dede:[\s\S]*?}[\s]-->/],
	                    /* 忽略dedecms {dede: ...} [field:.../]  {/dede:..} <? ... ?>  标签*/
	                    removeScriptTypeAttributes: true,
	                    /* 删除 type="text/javascript"  */
	                    removeStyleLinkTypeAttributes: true,
	                    /* 删除 type="text/css" */
	                    // removeComments: true,
	                    /*删除注释*/
	                    removeCommentsFromCDATA: true,
	                    /* 删除 script 和style标签内的HTML注释*/
	                    collapseWhitespace: true,
	                    /*压缩空白*/
	                    collapseBooleanAttributes: true,
	                    /*压缩布尔属性*/
	                    removeAttributeQuotes: true,
	                    /*删除属性引号*/
	                    removeRedundantAttributes: true,
	                    /*删除冗余属性*/
	                    useShortDoctype: true,
	                    /*使用短文档类型声明*/
	                    removeEmptyAttributes: true,
	                    /*删除空属性*/
	                   // removeEmptyElements: true,
	                    /*删除空元素*/
	                    removeOptionalTags: true,
	                    /*删除可选标签*/
	                    keepClosingSlash: true,
	                    /*保持反斜杠*/
	                    includeAutoGeneratedTags: true,
	                    /*  */
	                    collapseInlineTagWhitespace: true,
	                    /* display:inline 属性不间隙 */
	                    html5: true,
	                    report: 'gzip'
	                },
	                html: {
	                    files: [{
	                        expand: true,
	                        cwd: 'html/',
	                        src: ['**/*.htm'],
	                        dest: 'opt_html/'
	                    }]
	                }
	            },

            autoprefixer: {
    options: {
      // Task-specific options go here.
       browserslist:['last 2 versions','chrome','ie'],
       map:true,
       safe: true,
    },
    single_file: {
      // Target-specific file lists and/or options go here.
       src:'css/*.css',
       dest:'opt_css/*.css',
           },

    mutiple_files: {
      // Target-specific file lists and/or options go here.
        expand:true,
        flatten: true,//是否取代原先文件名
       src:'css/*.css',
       dest:'opt_css/',
           },

  },

	            /************     HTML 文件处理     ************/
	            /************     监控文件变化     ************/
	            watch: {
	                /* 监控文件变化并执行相应任务 */
	                img: {
	                    files: ['img/*.{png,jpg,jpeg}'],
	                    options: {
	                        livereload: true
	                    }
	                },
	                css: {
	                    options: {
	                        event: ['changed', 'added'],
	                        livereload: true
	                    },
	                    files: ['css/*.css']
	                },
	                js: {
	                    options: {
	                        livereload: true
	                    },
	                    files: ['js.js']
	                },
	                html: {
	                    options: {
	                        livereload: true
	                    },
	                    files: ['html/*.html']
	                }
	            }
	        });
	        /************     监控文件变化     ************/
	        /************     加载frunt模块     ************/
	        grunt.loadNpmTasks('grunt-contrib-csslint');
	        grunt.loadNpmTasks('grunt-contrib-cssmin');
	        grunt.loadNpmTasks('grunt-contrib-sass');
	        grunt.loadNpmTasks('grunt-contrib-jshint');
	        grunt.loadNpmTasks('grunt-contrib-uglify');
	        grunt.loadNpmTasks('grunt-contrib-imagemin');
	        grunt.loadNpmTasks('grunt-contrib-htmlmin');
	        grunt.loadNpmTasks('grunt-autoprefixer');
	        /************     加载frunt模块     ************/
	        /************    注册frunt 任务    ************/
	        grunt.loadNpmTasks('grunt-contrib-concat');
	        grunt.registerTask('check_gf', ['jshint']);
	         grunt.registerTask('prefixer', ['autoprefixer:mutiple_files']);
	        //grunt.loadNpmTasks('grunt-contrib-watch');
	        grunt.registerTask('default', ['csslint', 'cssmin', 'jshint', 'uglify:minjs', 'imagemin', 'htmlmin']);
	        grunt.registerTask('uncss', ['uncss']);
	        grunt.registerTask('check_css', ['csslint']);
	        grunt.registerTask('css', ['cssmin', 'concat:css']);
	        grunt.registerTask('scss', ['sass']);
	        grunt.registerTask('image', ['imagemin']);
	        grunt.registerTask('html', ['htmlmin']);
	        grunt.registerTask('js', ['concat:js', 'uglify:minjs']);
	        grunt.registerTask('compress_js', ['uglify:minjs']);
	        grunt.registerTask('compress_css', ['cssmin']);
	        // 定义默认任务
	        // grunt.registerTask('dev', ['csslint', 'jshint']);
	        // grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
	        /************    注册frunt 任务    ************/
	    };