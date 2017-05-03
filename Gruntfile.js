module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    clean: {
			deleteTarget: ['target'],
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
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('compile', [
		'clean:deleteTarget',
		'compile-handlebars:compile',
		'uglify'
	]);

};