# ============================================
# STAGE 1: Development Dependencies
# ============================================
FROM node:20-slim AS dev

# Install OpenSSL for Prisma on Debian
RUN apt-get update -y && apt-get install -y openssl && apt-get clean

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including dev)
RUN npm install

COPY . .

# Generate Prisma Client for Debian
RUN npx prisma generate --engine-type debian-openssl-3.0.x

# ============================================
# STAGE 2: Production
# ============================================
FROM node:20-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && apt-get clean

# Copy all files from dev stage
COPY --from=dev /app ./

# Expose port
EXPOSE 3001

# Run directly with ts-node (no build needed)
CMD ["npx", "ts-node", "src/main.ts"]
