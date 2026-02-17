#!/bin/bash

# Deployment Script for Netflix-Clone
# Usage: ./deploy.sh <user> <host>

USER=$1
HOST=$2

if [ -z "$USER" ] || [ -z "$HOST" ]; then
  echo "Usage: ./deploy.sh <user> <host>"
  exit 1
fi

echo "🚀 Packaging project..."
# Exclude build artifacts and git
tar --exclude='target' --exclude='node_modules' --exclude='.git' --exclude='.idea' -czf netflix-clone.tar.gz .

echo "📦 Uploading to $HOST..."
scp netflix-clone.tar.gz $USER@$HOST:~/

echo "☁️  Deploying on Remote Server..."
ssh $USER@$HOST << 'EOF'
  mkdir -p ~/netflix-clone
  tar -xzf netflix-clone.tar.gz -C ~/netflix-clone
  cd ~/netflix-clone
  
  # Ensure docker is installed (simplified check)
  if ! command -v docker &> /dev/null; then
      echo "Docker not found. Please install Docker on the server."
      exit 1
  fi

  echo "🔥 Starting Services..."
  docker-compose down
  docker-compose up -d --build
  
  echo "✅ Deployment Complete!"
EOF

rm netflix-clone.tar.gz
echo "🎉 Done!"
