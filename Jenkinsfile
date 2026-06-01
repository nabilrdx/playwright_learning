pipeline {

    agent any

    parameters {
        choice(
            name: 'SCRIPT_NAME',
            choices: [
                'CustomScriptTest',
                'jenkinsTest',
                'test2Jenkins',
                'all'
            ],
            description: 'Select npm script to execute'
        )
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat "npm run ${params.SCRIPT_NAME}"
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}