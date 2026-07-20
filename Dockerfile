FROM node:20-alpine AS base

# --- deps ---
FROM base AS deps
RUN apk add --no-cache gcc g++ make python3
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- build ---
FROM base AS build
RUN apk add --no-cache gcc g++ make python3
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN pnpm build

# --- production ---
FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/start.sh ./start.sh

RUN chmod +x ./start.sh
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

EXPOSE 5500
ENV PORT=5500
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]
