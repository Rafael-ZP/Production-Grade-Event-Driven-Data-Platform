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
                    // Build specific services (excluding jenkins itself to avoid recreation)
                    sh "${DOCKER_COMPOSE_CMD} build gateway-service auth-service movie-service stream-service event-service analytics-service frontend postgres redis kafka zookeeper"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop & Remove existing application containers to prevent naming conflicts
                    // This is critical because the user might have 'stream-service' running from a different project context
                    try {
                        sh "docker rm -f gateway-service auth-service movie-service stream-service event-service analytics-service netflix_frontend netflix_postgres netflix_redis netflix_kafka netflix_zookeeper"
                    } catch (Exception e) {
                        echo "No containers to remove or removal failed: ${e.message}"
                    }

                    // Start specific services in detached mode
                    sh "${DOCKER_COMPOSE_CMD} up -d gateway-service auth-service movie-service stream-service event-service analytics-service frontend postgres redis kafka zookeeper"
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
