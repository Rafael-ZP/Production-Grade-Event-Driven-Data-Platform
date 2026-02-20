# 🎥 Netflix Clone - Microservices Architecture

<img width="1941" height="886" alt="image" src="https://github.com/user-attachments/assets/30d010a7-a484-4438-a3f7-ced0236e649c" />



> A production-grade, event-driven distributed system mimicking Netflix's core functionality. Built with **Spring Boot Microservices**, **Next.js**, **Kafka**, **Redis**, and **Docker**.

---

## 🚀 Features

- **Microservices Architecture**: Independent services for Auth, Movie Metadata, Streaming, and Analytics.
- **Event-Driven Design**: Uses **Apache Kafka** for asynchronous communication (e.g., viewing history, analytics).
- **Video Streaming**: Byte-range request support for smooth video playback.
- **High Performance**: **Redis** caching for trending movies and analytics.
- **Modern Frontend**: **Next.js 14** with **Tailwind CSS** for a pixel-perfect, responsive UI.
- **CI/CD Pipeline**: fully automated Jenkins pipeline for building and deploying Docker containers.
- **Secure Authentication**: JWT-based stateless authentication.

---

## 🛠️ Tech Stack

### Backend
- **Java 17 & Spring Boot 3**: Core framework.
- **Spring Cloud Gateway**: API Gateway for routing and load balancing.
- **Spring Security + JWT**: Authentication and Authorization.
- **PostgreSQL**: Relational database for Users and Movies.
- **Apache Kafka**: Message broker for event ingestion.
- **Redis**: In-memory data structure store for caching.
- **Zookeeper**: Kafka coordination.

### Frontend
- **Next.js 14 (App Router)**: React framework for SSR and SEO.
- **TypeScript**: Static typing for reliability.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: HTTP client.

### DevOps & Infrastructure
- **Docker & Docker Compose**: Containerization and Orchestration.
- **Jenkins**: CI/CD Automation.
- **Git**: Source Control.

---

## 🏗️ Architecture

```
graph TD
    Client[Client (Next.js)] -->|HTTP/REST| Gateway[API Gateway :8080]
    Gateway -->|/auth| Auth[Auth Service :8081]
    Gateway -->|/movies| Movie[Movie Service :8082]
    Gateway -->|/stream| Stream[Stream Service :8083]
    Gateway -->|/events| Event[Event Service :8084]
    
    Auth --> DB1[(Postgres: AuthDB)]
    Movie --> DB2[(Postgres: MovieDB)]
    Stream --> FS[File System / Object Storage]
    
    Event -->|Produce| Kafka{Apache Kafka}
    Kafka -->|Consume| Analytics[Analytics Service :8085]
    Analytics --> Redis[(Redis Cache)]
```

---

## 🏁 Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 17+ (for local dev)
- Node.js 20+ (for local dev)

### Quick Start (Docker)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Rafael-ZP/Production-Grade-Event-Driven-Data-Platform.git
    cd Production-Grade-Event-Driven-Data-Platform
    ```

2.  **Start the System**
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the Application**
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Jenkins**: [http://localhost:8086](http://localhost:8086)
    - **API Gateway**: [http://localhost:8080](http://localhost:8080)

---

## 📂 Service Overview

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend** | `3000` | Next.js User Interface |
| **Gateway** | `8080` | Entry point, routing, rate limiting |
| **Auth** | `8081` | User registration, login, JWT issuance |
| **Movie** | `8082` | Metadata management (titles, descriptions) |
| **Stream** | `8083` | Video streaming (Range header support) |
| **Event** | `8084` | Ingests user actions (views, clicks) |
| **Analytics** | `8085` | Processes events, calculates trending content |

---

## 🧪 Testing

### Sample Users
- **Email**: `user@example.com`
- **Password**: `password`

### Streaming
The system comes pre-loaded with metadata for *Inception*, *Interstellar*, and *The Matrix*. Ensure you have `.mp4` files in the `netflix-storage` directory matching the filenames (e.g., `inception.mp4`) to test playback.

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
