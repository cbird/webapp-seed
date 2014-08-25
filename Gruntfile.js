/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        'pkg': grunt.file.readJSON('package.json'),
        'banner': '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= _.pluck(pkg.authors, "name").join(", ") %>; */\n',

        // Task configuration
        'bower': {
            install: {
                options: {
                    cleanTargetDir: true,
                    targetDir: './dist/lib'
                }
            }
        },
        'browserify': {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.js': ['src/js/**/*.js']
                }
            }
        },
        'concat': {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['dist/js/<%= pkg.name %>.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        'uglify': {
            dist: {
                options: {
                    banner: '<%= banner %>',
                    sourceMap: true,
                    report: 'gzip'
                },
                src: '<%= concat.dist.dest %>',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        'compress': {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        src: ['<%= uglify.dist.dest %>'],
                        dest: './',
                        ext: '.gz.js'
                    }
                ]
            }
        },
        'less': {
            development: {
                options: {
                    paths: ['src/css'],
                    syncImport: true
                },
                files: {
                    'dist/css/style.css': 'src/css/style.less'
                }
            },
            production: {
                options: {
                    paths: ['src/css'],
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/css/style.min.css': 'src/css/style.less'
                }
            }
        },
        'copy': {
            main: {
                files: [
                    // files in root
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile'},

                    // images
                    {expand: true, cwd: 'src/', src: ['img/**'], dest: 'dist/'},

                    // partials
                    {expand: true, cwd: 'src/', src: ['partials/**'], dest: 'dist/'}
                ]
            }
        },
        'jshint': {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    gd: true,
                    angular: true,
                    console: true,
                    alert: true,
                    module: true,
                    require: true,
                    describe: true,
                    it: true,
                    beforeEach: true,
                    assert: true,
                    sinon: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        'mocha-chai-sinon': {
            build: {
                src: ['test/**/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec'
                }
            },
            coverage: {
                src: ['test/**/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: './coverage.html'
                }
            }
        },
        'replace': {
            main: {
                src: ['dist/js/<%= pkg.name %>.min.js', 'dist/js/<%= pkg.name %>.js'],
                overwrite: true,
                replacements: [{
                    from: '{{APPNAME}}',
                    to: '<%= pkg.name %>'
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-chai-sinon');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-text-replace');

    // Testing
    grunt.registerTask('test', [
        'mocha-chai-sinon'
    ]);

    // Default task.
    grunt.registerTask('default', [
        'bower',
        'jshint',
        'browserify',
        'concat',
        'less',
        'uglify',
        'replace',
        'copy',
        'compress'
    ]);

};
