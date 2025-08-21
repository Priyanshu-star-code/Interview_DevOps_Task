# 🚀 DevOps Interview Task

A comprehensive demonstration of modern DevOps practices showcasing containerization, CI/CD automation, and distributed system architecture design.

## 📋 Overview

This repository presents a **3-tier DevOps implementation** that demonstrates:

1. **🐳 Containerization**: Full-stack React + Node.js application with Nginx reverse proxy
2. **🔄 CI/CD Pipeline**: Automated deployment using GitLab self-hosted runner
3. **🏗️ System Design**: Scalable distributed Laravel application architecture

---

## 📂 Project Structure

```
Interview_DevOps_Task/
│
├── backend/                    # Node.js Express API
│   ├── Dockerfile             # Backend containerization
│   ├── package.json           # Node.js dependencies
│   └── src/
│       └── index.js           # Express server with API endpoints
│
├── frontend/                   # React Frontend Application
│   ├── Dockerfile             # Frontend containerization
│   ├── package.json           # React dependencies
│   ├── public/                # Static assets
│   └── src/
│       └── App.js             # Main React component
│
├── nginx/                      # Reverse Proxy Configuration
│   └── default.conf           # Nginx routing rules
│
├── docker-compose.yml          # Multi-container orchestration
├── .gitlab-ci.yml             # CI/CD pipeline configuration
├── .gitignore                 # Version control exclusions
└── README.md                  # Project documentation
```

---

## 🐳 Step 1: Containerization with Nginx

### Architecture Components

- **Backend (Node.js)**: Express API server running on port 5000
- **Frontend (React)**: Production-optimized build served via Nginx
- **Reverse Proxy (Nginx)**: Routes traffic between frontend and backend

### Container Configuration

#### Backend Dockerfile

```# Multi-stage build
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Production image
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5000
CMD ["node", "server.js"]

```

#### Frontend Dockerfile

```# Build Stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage (nginx serve karega)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

```

### Nginx Routing Rules

- `/ ` → React frontend (SPA routing)
- `/api/*` → Node.js backend (API endpoints)
- Static assets served with optimized caching

---

## ⚙️ Step 2: GitLab CI/CD Pipeline

### Pipeline Configuration

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_COMPOSE_VERSION: "1.29.2"

before_script:
  - docker --version
  - docker-compose --version

build_application:
  stage: build
  script:
    - docker-compose build
    - docker system prune -f
  only:
    - main
    - develop

test_application:
  stage: test
  script:
    - docker-compose -f docker-compose.test.yml up --abort-on-container-exit
  only:
    - main
    - develop

deploy_production:
  stage: deploy
  script:
    - docker-compose down
    - docker-compose up -d
    - docker-compose ps
  environment:
    name: production
    url: http://localhost
  only:
    - main
```

### Pipeline Features

- **Automated Builds**: Triggers on code pushes to main/develop branches
- **Testing Integration**: Runs test suites before deployment
- **Zero-downtime Deployment**: Graceful container restart strategy
- **Environment Management**: Separate staging and production environments

---

## 🏗️ Step 3: Distributed Laravel Application Design

### System Architecture

```
                    [Load Balancer]
                          |
              ┌───────────┼───────────┐
              │           │           │
        [Web Server 1] [Web Server 2] [Web Server N]
              │           │           │
              └─────── [PHP-FPM] ─────┘
                          |
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   [Redis Cache]    [MySQL Cluster]   [Elasticsearch]
```

### Infrastructure Components

#### **Web Tier**

- **Load Balancer**: AWS ALB/HAProxy for traffic distribution
- **Web Servers**: Nginx containers with PHP-FPM
- **Auto-scaling**: Horizontal scaling based on CPU/memory metrics

#### **Application Tier**

- **Laravel Framework**: PHP 8.1+ with optimized configurations
- **Session Management**: Redis-based session storage
- **Queue Processing**: Laravel Queues with Redis/SQS backend

#### **Data Tier**

- **Primary Database**: MySQL 8.0 with master-slave replication
- **Caching Layer**: Redis cluster for application and session caching
- **Search Engine**: Elasticsearch for full-text search and analytics

### Security Implementation

#### **Network Security**

- Private subnets for database and cache layers
- Security groups restricting port access
- VPC peering for secure inter-service communication

#### **Application Security**

- SSL/TLS encryption for all communications
- JWT authentication with refresh token rotation
- Rate limiting and DDoS protection via CloudFlare

#### **Data Security**

- Database encryption at rest and in transit
- Regular automated backups with point-in-time recovery
- Secrets management via AWS Secrets Manager/HashiCorp Vault

### Scalability Strategy

#### **Horizontal Scaling**

- Container orchestration with Kubernetes/ECS
- Database read replicas for improved performance
- CDN integration for static asset delivery

#### **Performance Optimization**

- Redis caching strategy (query, session, page caching)
- Database query optimization and indexing
- Lazy loading and pagination for large datasets

### Cost Optimization

#### **Resource Management**

- Auto-scaling policies to match demand
- Reserved instances for predictable workloads
- Spot instances for non-critical processing

#### **Monitoring & Optimization**

- CloudWatch/Prometheus monitoring
- Cost analysis and optimization recommendations
- Resource usage alerts and automated scaling

---

## 🚀 Quick Start Guide

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 1.29+
- Git
- 4GB+ RAM available

### Installation & Deployment

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd Interview_DevOps_Task
   ```

2. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env

   # Update configuration values
   nano .env
   ```

3. **Build & Deploy**

   ```bash
   # Build all containers
   docker-compose build

   # Start services in detached mode
   docker-compose up -d

   # Verify deployment
   docker-compose ps
   ```

4. **Access Application**
   - **Frontend**: http://localhost
   - **Backend API**: http://localhost/api/hello
   - **Health Check**: http://localhost/api/health

### Development Workflow

```bash
# View real-time logs
docker-compose logs -f

# Execute commands in containers
docker-compose exec backend npm test
docker-compose exec frontend npm run lint

# Rebuild specific service
docker-compose up --build frontend

# Clean shutdown
docker-compose down
```

---

## 📊 Monitoring & Maintenance

### Health Monitoring

- **Application Health**: Built-in health check endpoints
- **Container Health**: Docker health check configurations
- **Performance Metrics**: CPU, memory, and network monitoring

### Log Management

- Centralized logging with ELK stack integration
- Log rotation and retention policies
- Real-time error alerting via Slack/email

### Backup Strategy

- Automated database backups (daily/hourly)
- Container image versioning and rollback capability
- Configuration backup and disaster recovery procedures

---

## 🧪 Testing Strategy

### Test Coverage

- **Unit Tests**: Backend API endpoints and business logic
- **Integration Tests**: Frontend-backend communication
- **E2E Tests**: Complete user workflow validation
- **Load Tests**: Performance under high traffic conditions

### Quality Assurance

```bash
# Run test suite
docker-compose -f docker-compose.test.yml up --abort-on-container-exit

# Code quality checks
docker-compose exec backend npm run lint
docker-compose exec backend npm run audit

# Security scanning
docker-compose exec backend npm audit --audit-level high
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 80, 3000, and 5000 are available
2. **Memory Issues**: Increase Docker memory allocation to 4GB+
3. **Build Failures**: Clear Docker cache with `docker system prune -a`

## 👨‍💻 Author

**Your Name**

- LinkedIn: [https://www.linkedin.com/in/priyanshu-verma94/](https://www.linkedin.com/in/priyanshu-verma94/)
- Email: vpriyanshu708@gmail.com

---
