module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    clean: {
			deleteTarget: ['target', 'build'],
			deleteTmpGz: ['target/**/*.gz']
	    },
	    copy: {
	    	copyImgs: {
	    		files: [{
	    			expand: true,
	    			cwd: 'src',
	    			src: [
	    				'img/**/*.*'
	    			],
	    			dest: 'target/'
	    		}]
	    	}
	    },
	    'compile-handlebars': {
	    	compile: {
	    		files: [{
	    			expand: true,
	    			cwd: 'src/templates',
	    			src: '*.hbs',
	    			dest: 'target/',
	    			ext: '.html'
	    		}],
	    		templateData: 'src/templates/*.json',
	    		partials: 'src/templates/partials/*.hbs',
	    		preHTML: 'src/html/pre-html.html',
	    		postHTML: 'src/html/post-html.html'
	    	}
	    },
	    uglify: {
	    	options:{
	    		mangle: false
	    	},
	    	build: {
	    		src: ['src/scripts/vendor/**/*.js', 'src/scripts/**/*.js'],
	    		dest: 'target/scripts/cdc-site.min.js'
	    	}
	    },
	    sass: {
	    	compile: {
	    		files: [{
	    			expand: true,
	    			cwd: 'src/styles',
	    			src: ['*.scss'],
	    			dest: 'build/styles/',
	    			ext: '.css'
	    		}]
	    	}
	    },
	    cssmin: {
			options: {
				keepSpecialComments: 0
			},
			fromBuiltSrc: {
				files:{
					'target/styles/cdc-site.min.css': ['build/styles/**/*.css']
				}
			},
			fromVendorSrc: {
				files:{
					'target/styles/cdc-vendor-site.min.css': ['src/styles/vendor/*.css']
				}
			}
		},
	    concat:{
			dist:{
				src: ['target/styles/cdc-vendor-site.min.css', 'target/styles/cdc-site.min.css'],
				dest: 'target/styles/cdc-site.min.css'
			}
	    },
		uncss: {
			dist: {
				files: {
					'target/styles/cdc-site.min.css': [
						'target/**/*.html'
					]
				}
			}
		},
		inline: {
			dist: {
				options: {
					cssmin: true
				},
				src: ['target/**/*.html']
			}
		},
		htmlmin: {
			dist:{
				options:{
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					src: ['target/**/*.html'],
					dest: '.'
				}]
			}
	    },
		hashres: {
			options:{
				fileNameFormat: '${name}.${hash}.${ext}',
				renameFiles: true
			},
			prod:{
				src:[
					'target/scripts/**/*.js', 
					'target/styles/**/*.css',
					'target/img/**/*.*'
				],
				dest: ['target/**/*.html', 'target/**/*.css']
			}
		},
		compress: {
			main:{
				options: {
				  mode: 'gzip'
				},
				expand: true,
				src: ['target/**/*.*']
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: 'target',
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-uncss');
  	grunt.loadNpmTasks('grunt-inline');
  	grunt.loadNpmTasks('grunt-hashres');

	grunt.registerTask('compile', [
		'clean:deleteTarget',
		'copy:copyImgs',
		'compile-handlebars:compile',
		'uglify',
		'sass:compile',
		'cssmin:fromBuiltSrc',
		'uncss',
		'cssmin:fromVendorSrc',
		'concat',
		'inline',
		'htmlmin'
	]);

	grunt.registerTask('dev', [
		'compile',
		'connect'
	]);

	grunt.registerTask('default', [
		'compile',
		'hashres',
		'compress'
	]);

};