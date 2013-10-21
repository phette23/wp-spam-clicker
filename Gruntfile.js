// Generated on 2013-10-16 using generator-bookmarklet 0.1.2

'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'main.js'
      ]
    },

    uglify: {
      options: {
        banner: '// Copy this to your URL bar:\njavascript:',
        report: 'min'
      },
      dist: {
        files: {
          'bookmarklet.min.js': [ 'main.js' ]
        }
      }
    },

    watch: {
      dist: {
        files: 'main.js',
        tasks: [ 'uglify' ]
      }
    }
  });

  grunt.registerTask( 'build', [ 'uglify' ] );

  grunt.registerTask( 'default', [ 'jshint', 'build' ] );
};
