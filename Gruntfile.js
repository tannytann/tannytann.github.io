module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: ['js/gmaps.js', 'assets/owl-carousel/owl.carousel.min.js', 'js/waypoints.js', 'js/jquery.fittext.js', 'js/magnific-popup.js', 'js/wow.min.js', 'js/jquery.nicescroll.min.js', 'js/script.js'],
                dest: 'js/dist.js'
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/dist.js',
                dest: 'js/dist.min.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'css/output.css': ['css/default.css', 'css/style.css', 'css/responsive.css', 'css/animate.css', 'css/magnific-popup.css', 'assets/owl-carousel/owl.carousel.css', 'assets/owl-carousel/owl.theme.css']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

};