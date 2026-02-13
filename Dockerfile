# Multi-stage build: Stage 1 - Build React app
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy root and client-react packages
COPY package*.json ./
COPY client-react/package*.json ./client-react/

# Install all deps (needed for build)
RUN npm ci && cd client-react && npm ci

# Copy source code
COPY . .

# Build the React app (creates client-react/dist)
RUN cd client-react && npm run build

# Stage 2 - Production image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files from builder
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built React app from builder
COPY --from=builder /usr/src/app/client-react/dist ./client-react/dist

# Copy server code
COPY server ./server
COPY server.js .

# Expose the port (default 8080)
EXPOSE 8080

# Start the server
CMD [ "node", "server.js" ]