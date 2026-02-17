# Netflix Clone - Comprehensive System Architecture & Technology Review

This document serves as a detailed technical overview of the distributed video streaming platform I have engineered. It outlines the architectural decisions, technology stack, microservices breakdown, and the event-driven data flow that powers the system.

## 1. High-Level Architecture
This project implements a **Microservices Architecture** using the **Spring Boot** ecosystem for the backend and **Next.js** for the frontend. The system is containerized using **Docker** and orchestrated via **Docker Compose**, with a fully automated **CI/CD pipeline** managed by **Jenkins**.

### Key Architectural Patterns
- **API Gateway Pattern**: A single entry point (Spring Cloud Gateway) routes all client requests to the appropriate microservices.
- **Service Discovery**: Services register themselves and are discoverable via the internal Docker network DNS.
- **Event-Driven Architecture**: Critical user actions (e.g., watching a video) enable asynchronous communication between services using **Apache Kafka**.
- **Database per Service**: Each microservice manages its own database schema to ensure loose coupling.

---

## 2. Technology Stack

### Frontend
- **Framework**: **Next.js 14** (React) - Chosen for its server-side rendering (SSR) capabilities and SEO optimization.
- **Language**: **TypeScript** - Ensures type safety and reduces runtime errors.
- **Styling**: **Tailwind CSS** - Utility-first CSS framework for rapid, responsive UI development.
- **State Management**: **Context API** (React) - Manages global authentication state.
- **HTTP Client**: **Axios** - Handles API requests with interceptors for JWT injection.

### Backend (Microservices)
- **Framework**: **Spring Boot 3.2.5** - Robust framework for building production-grade Java applications.
- **Language**: **Java 17** (LTS) - Modern Java features with long-term support.
- **Build Tool**: **Maven** - Dependency management and build automation.
- **Data Access**: **Spring Data JPA (Hibernate)** - ORM for database interactions.

### Infrastructure & Data Stores
- **API Gateway**: **Spring Cloud Gateway** - Handles routing, cross-cutting concerns (CORS), and load balancing.
- **Relational Database**: **PostgreSQL 15** - Primary storage for user data and movie metadata.
- **Message Broker**: **Apache Kafka** (w/ Zookeeper) - Handles high-throughput event streaming.
- **Caching/State Store**: **Redis** - In-memory data store for real-time analytics counters.

### DevOps & CI/CD
- **Containerization**: **Docker** - Ensuring consistency across development and production environments.
- **Orchestration**: **Docker Compose** - Managing multi-container applications.
- **CI/CD**: **Jenkins** - Automating breakdown, testing, and deployment.
- **Version Control**: **Git & GitHub** - Source code management.
- **Tunneling**: **Ngrok** - Exposing local Jenkins instance for GitHub Webhooks.

---

## 3. Microservices Breakdown

### 1. API Gateway (`gateway-service`)
- **Port**: 8080
- **Role**: Entry point for all external traffic.
- **Key Features**:
  - Routes `/auth/**` to Auth Service.
  - Routes `/movies/**` to Movie Service.
  - Routes `/stream/**` to Streaming Service.
  - Routes `/events/**` to Event Service.
  - Handles **CORS** (Cross-Origin Resource Sharing) configuration globally.

### 2. Authentication Service (`auth-service`)
- **Port**: 8081
- **Database**: PostgreSQL (`auth_db`)
- **Role**: Manages user identity and access control.
- **Key Features**:
  - **Registration**: Creates users with a subscription plan (allowed movies limit).
  - **Login**: Validates credentials and issues **JWT** (JSON Web Tokens).
  - **Token Validation**: Verifies JWT signatures for secured endpoints.

### 3. Movie Metadata Service (`movie-service`)
- **Port**: 8082
- **Database**: PostgreSQL (`movie_db`)
- **Role**: Manages the catalog of available movies.
- **Key Features**:
  - Stores movie titles, descriptions, and video URLs.
  - Seeds initial dummy data (Inception, Interstellar, Matrix) on startup.

### 4. Streaming Service (`stream-service`)
- **Port**: 8083
- **Storage**: Local filesystem (`./netflix-storage`) mapped to `/videos`.
- **Role**: Serves video content efficiently.
- **Key Features**:
  - Implements **HTTP Range Requests** to support video seeking and smooth playback.
  - Streams video chunks directly from the disk.

### 5. Event Ingestion Service (`event-service`)
- **Port**: 8084
- **Infrastructure**: Kafka Producer
- **Role**: Ingests user activity events.
- **Key Features**:
  - Receives "Heartbeat" events from the frontend when a user watches a video.
  - Publishes events to the `video-view-topic` in Kafka.

### 6. Analytics Service (`analytics-service`)
- **Port**: 8085
- **Infrastructure**: Kafka Consumer, Redis
- **Role**: Processes events and aggregates data.
- **Key Features**:
  - Consumes messages from `video-view-topic`.
  - Increments view counters in **Redis** in real-time.
  - Provides APIs to retrieve current view statistics.

---

## 4. System Flow

### User Authentication Flow
1. **User** enters credentials on Frontend.
2. Request hits **Gateway**, forwarded to **Auth Service**.
3. **Auth Service** verifies credentials against PostgreSQL.
4. If valid, generates a **JWT** containing user claims (email, allowed movies).
5. Frontend stores JWT in `localStorage` and attaches it to subsequent requests.

### Video Streaming Flow
1. **User** clicks "Play" on a movie.
2. Frontend requests video stream via **Gateway** -> **Stream Service**.
3. **Stream Service** reads the file chunk from disk and streams it back with `Content-Range` headers.
4. Browser plays the video and supports seeking.

### Event & Analytics Flow
1. While watching, Frontend sends periodic "heartbeats" to **Gateway** -> **Event Service**.
2. **Event Service** produces a message to **Kafka**.
3. **Analytics Service** consumes the message asynchronously.
4. **Analytics Service** updates the `view_count:{movieId}` key in **Redis**.

---

## 5. CI/CD Pipeline Flow

I have implemented a **Jenkins Multibranch Pipeline** to automate the delivery process:
1. **Code Push**: I push code changes to the GitHub repository.
2. **Webhook Trigger**: GitHub sends a payload to my local Jenkins instance (exposed via Ngrok).
3. **Checkout**: Jenkins pulls the latest code from the repository.
4. **Build**: Jenkins runs `docker-compose build` to create fresh Docker images for all services.
5. **Deploy**: Jenkins runs `docker-compose up -d` to restart the containers with the new build.
6. **Verify**: The system is live with the latest changes without manual intervention.

---

## 6. Conclusion
This project demonstrates mastery of building scalable, distributed systems. By decoupling services, utilizing event-driven communication, and automating deployment, I have created a platform that is robust, maintainable, and ready for production-grade workloads.
