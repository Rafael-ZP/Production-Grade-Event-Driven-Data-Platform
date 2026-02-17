pipeline {
    agent any

    environment {
        // Define any environment variables here if needed
        DOCKER_COMPOSE_CMD = 'docker-compose'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    // Build all services using docker-compose (Maven build happens inside containers)
                    sh "${DOCKER_COMPOSE_CMD} build"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Start all services in detached mode
                    sh "${DOCKER_COMPOSE_CMD} up -d"
                }
            }
        }
        
        stage('Verification') {
            steps {
                script {
                    // Simple health check or wait for services to be ready
                    sleep 30
                    sh "${DOCKER_COMPOSE_CMD} ps"
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup provided if needed, but for dev environment keep containers running
            echo 'Pipeline finished'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
