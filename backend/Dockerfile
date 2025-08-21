# Multi-stage build
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
