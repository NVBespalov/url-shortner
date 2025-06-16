# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Add dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy production files
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

# Set permissions
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Environment setup
ARG NODE_ENV=production
ARG BACKEND_PORT=3000
ENV NODE_ENV=${NODE_ENV}
ENV BACKEND_PORT=${BACKEND_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:${BACKEND_PORT}/health || exit 1

EXPOSE ${BACKEND_PORT}

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
