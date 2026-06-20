# Monolith: Vite frontend + Express API. Build from repo root.

# --- Stage 1: build the SPA (Vite) ---
# Produces static HTML/JS/CSS under frontend/dist.
FROM node:22-bookworm-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY frontend/ ./
# Empty = browser calls /api on the same host as the page.
ENV VITE_API_URL=
# Public Clerk key is embedded in client JS.
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
RUN npm run build

# --- Stage 2: runtime image (only prod deps + built assets) ---
# Express serves API routes and static files from public/.
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

# Copy backend source files directly (no build step is configured for Node.js backend)
COPY backend/src ./src

# Copy built frontend assets to the public folder served by Express
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001
USER node

# Start the application using the correct backend entry point
CMD ["node", "src/server.js"]
