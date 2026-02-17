FROM jenkins/jenkins:lts-jdk17

USER root

# Install Docker CLI + docker-compose
RUN apt-get update && \
    apt-get install -y docker.io docker-compose && \
    apt-get clean

# Allow jenkins user to use docker
RUN usermod -aG docker jenkins

USER jenkins