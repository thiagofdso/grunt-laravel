//Gruntfile.js
module.exports = function(grunt) {

    //Inicializando o objeto de configuração
    grunt.initConfig({

        // Todas as configuraçoẽs de tarefas que vamos definir nesse bloco
        less: {
            development: {
                options: {
                    compress: true,  //minifica o resultado
                },
                files: {
                    //compilando frontend.less em frontend.css
                    "./public/assets/stylesheets/frontend.css":"./resources/assets/less/frontend.less",
                    //compilando backend.less em backend.css
                    "./public/assets/stylesheets/backend.css":"./resources/assets/less/backend.less"
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            javascript: {
                src: ['./vendor/components/jquery/jquery.min.js','./vendor/twitter/bootstrap/dist/js/bootstrap.min.js','./resources/assets/javascript/frontend.js'],
                dest: './public/assets/javascript/frontend.js',
            },
        },
        uglify: {
            options: {
                mangle: false  // não muda os nomes das funções e variáveis
            },
            dist: {
                files: {
                    './public/assets/javascript/frontend.js': './public/assets/javascript/frontend.js'
                }
            }
        },
        phpunit: {
            classes: {
                dir: 'resources/tests/'   //a localização dos testes
            },
            options: {
                bin: 'vendor/bin/phpunit',
                colors: true
            }
        },
        watch: {
            js: {
                files: ['./resources/assets/javascript/*.*'],   //arquivos monitorados
                tasks: ['concat:javascript','uglify'],     //tarefas executadas
                options: {
                    livereload: true                        //atualiza o navegador
                }
            },
            less: {
                files: ['./resources/assets/less/*.*'],  //arquivos monitorados
                tasks: ['less'],                          //tarefas executadas
                options: {
                    livereload: true                        //atualiza o navegador
                }
            },
            tests: {
                files: ['resources/controllers/*.php','resources/models/*.php'],  //a tarefa vai ser executada só quando salvar arquivo nessa localização
                tasks: ['phpunit']
            }
        }
    });

    // Carregar os plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');


    // Definicão da tarefa default
    grunt.registerTask('default', ['watch']);

};