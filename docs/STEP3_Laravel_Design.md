# 🚀 DevOps Interview Task

This repository showcases a **3-Step DevOps Task** that demonstrates:

1. **Containerization**: Dockerizing a React + Node.js application with Nginx reverse proxy.
2. **CI/CD Pipeline**: Automating deployments using a **GitLab self-hosted runner**.
3. **System Design**: Planning a **Distributed Laravel Application** with scalability, security, and cost-effectiveness in mind.

---

## 📂 Project Structure

```plaintext
Interview_DevOps_Task/
│
├── backend/          # Node.js Backend (Express API)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── index.js
│
├── frontend/         # React Frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
│       └── App.js
│
├── nginx/            # Nginx Reverse Proxy Configuration
│   └── default.conf
│
├── .gitignore        # Ignore unnecessary files (e.g., node_modules, build)
├── [docker-compose.yml](http://_vscodecontentref_/0) # Multi-container setup
├── [.gitlab-ci.yml](http://_vscodecontentref_/1)    # GitLab CI/CD Pipeline Configuration
└── [README.md](http://_vscodecontentref_/2)         # Documentation


```

🛠️ Step 1: Dockerization with Nginx
Overview
Backend (Node.js API):
Runs on port 5000.
Simple Express server with a /api/hello endpoint.
Frontend (React App):
Built using npm run build.
Served via Nginx.
Nginx Reverse Proxy:
Routes / → React frontend.
Routes /api/ → Node backend.

Run the Stack
docker-compose up --build -d
Frontend: http://localhost
Backend: http://localhost/api/hello

⚙️ Step 2: GitLab CI/CD Pipeline
Overview
The pipeline uses a GitLab self-hosted runner to automate builds and deployments.

.gitlab-ci.yml
stages:

- build
- deploy

build:
stage: build
script: - docker-compose build

deploy:
stage: deploy
script: - docker-compose down - docker-compose up -d
only: - main

Explanation
Build Stage: Builds Docker images for the backend and frontend.
Deploy Stage: Stops old containers and deploys updated ones.
Trigger: Automatically runs when code is pushed to the main branch.

Step 3: Distributed Laravel Application Design
Planned Architecture
The Laravel application is designed for scalability and high availability, with the following components:

Web Server (Nginx/Apache): Serves the Laravel frontend.
PHP-FPM: Executes PHP code.
Redis: Handles caching and session management.
MySQL (RDS/Aurora): Relational database for persistent storage.
Elasticsearch: Provides search indexing and full-text search.
Load Balancer: Distributes traffic across multiple web servers.
Key Features
Security:
Use TLS/SSL for all communication.
Place Redis, MySQL, and Elasticsearch in private subnets.
Use security groups and firewalls to restrict access.
Scalability:
Deploy multiple containers behind a load balancer.
Use Redis for caching to improve performance.
Cost-Effectiveness:
Leverage managed services (e.g., AWS RDS, ElastiCache) or scale containers dynamically.
▶️ How to Run
Clone the Repository:

Start Services:

Access the Application:

Frontend: [http://localhost<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>](</vscode_annotation>http://localhost)
Backend API: http://localhost/api/hello
🙌 Conclusion
This project demonstrates core DevOps skills, including:

Step 1: Containerization of a React + Node.js application with Nginx.
Step 2: CI/CD pipeline setup using GitLab self-hosted runner.
Step 3: Designing a scalable, secure, and cost-effective Laravel distributed architecture.
By combining containerization, automation, and system design, this task highlights the ability to build and manage modern, production-ready applications.

▶️ How to Run
git clone <repo-url>
cd Interview_DevOps_Task

docker-compose up --build -d

🙌 Conclusion
This project demonstrates core DevOps skills, including:

Step 1: Containerization of a React + Node.js application with Nginx.
Step 2: CI/CD pipeline setup using GitLab self-hosted runner.
Step 3: Designing a scalable, secure, and cost-effective Laravel distributed architecture.
