pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/FelipeRBDantas/testes-api-cy.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                bat 'npm run cy:run'
            }
        }
    }
}
