module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      uglify: {
        alice: {
          options: {
            mangle: false
          },
          files: {
            'build/js/alice.min.js': [
              'src/js/directives.js', 
              'src/js/services.js', 
              'src/js/controllers.js', 
              'src/js/alice.js'
            ],
          }
        },
        angular: {
          options: {
            mangle: true
          },
          files: {
            'build/js/angular.min.js': ['src/lib/angular-1.0.6.js']
          }
        },
      },

      jshint: {
        check: ['Gruntfile.js', 'src/js/*.js']
      },

      less: {
        main: {
          options: {
              paths: ["src/css"]
          },
          files: {
            "build/css/style.css": "src/css/main.less"
          }
        }
      },

      includes: {
        files: {
          src: ['src/index_build.html'], // Source files
          dest: 'build/index.html', // Destination directory
        }
      },

      copy: {
        main: {
          files: [
            {src: ['src/img/*'], dest: 'build/img/', filter: 'isFile', flatten: true, expand: true},
            {src: ['src/data/magazine.json'], dest: 'build/data/magazine.json'}
          ]
        }      
      }
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-includes');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'less', 'copy', 'uglify', 'includes']);

};