# 1. Stage for assembly
FROM node:20-alpine AS builder

WORKDIR /app
COPY ../../package*.json ./
COPY ../../pnpm-lock.yaml* ./
COPY ../../pnpm-workspace.yaml ./
COPY ../../turbo.json ./
COPY ../../packages ./packages
COPY . .  # copy the current email service

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm --filter email-service build

# 2. Stage to launch
FROM node:20-alpine AS runner
WORKDIR /app

# Copy the built code
COPY --from=builder /app/apps/email-service/dist ./dist
COPY apps/email-service/package*.json ./

RUN npm install --omit=dev --ignore-scripts

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
