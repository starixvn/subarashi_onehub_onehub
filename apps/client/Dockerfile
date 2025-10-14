# Stage 1: Build React Frontend
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy client source code
COPY . .

# Build the React app
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set root user to configure nginx
USER root

# Copy nginx configuration
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/dist .

# Create non-root user for runtime
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser && \
    chown -R appuser:appuser /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appuser /var/run/nginx.pid

USER appuser

# Expose port
EXPOSE 8080

# Start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
