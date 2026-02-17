# Netflix Clone (Microservices Architecture)

A distributed video streaming platform built with Spring Boot Microservices, specialized infrastructure (Kafka, Redis, Postgres), and Next.js Frontend.

## Architecture

- **API Gateway**: Entry point (Port 8080)
- **Auth Service**: User management & JWT (Port 8081)
- **Movie Service**: Metadata & Catalog (Port 8082)
- **Stream Service**: Video Streaming with Range support (Port 8083)
- **Event Service**: User activity ingestion (Kafka Producer) (Port 8084)
- **Analytics Service**: Real-time stats (Kafka Consumer -> Redis) (Port 8085)
- **Frontend**: Next.js User Interface (Port 3000)

## Infrastructure

Managed via `docker-compose.yml`:
- PostgreSQL (Port 5432)
- Kafka + Zookeeper (Port 9092 / 2181)
- Redis (Port 6379)

## Prerequisites

- Docker & Docker Compose
- Java 17+
- Node.js 18+

## How to Run

1. **Build Backend Services**:
   ```bash
   # Build all services (skip tests)
   ./mvnw clean package -DskipTests
   # You need to run this in each service directory or use a script
   ```

2. **Run Infrastructure & Apps**:
   ```bash
   docker-compose up --build
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080

## Deployment

Use the `deploy.sh` script to deploy to a remote Ubuntu server:
```bash
./deploy.sh <user> <host>
```
