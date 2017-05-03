module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    clean: {
			deleteTarget: ['target', 'build'],
			deleteTmpGz: ['target/**/*.gz'],
			deleteCssTmp: ['target/styles']
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
	    		src: 'src/scripts/**/*.js',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-uncss');
  	grunt.loadNpmTasks('grunt-inline');

	grunt.registerTask('compile', [
		'clean:deleteTarget',
		'compile-handlebars:compile',
		'uglify',
		'sass:compile',
		'cssmin:fromBuiltSrc',
		'uncss',
		'inline'
	]);

};