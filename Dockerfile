FROM node:22-alpine AS base

# --- deps ---
FROM base AS deps
RUN apk add --no-cache gcc g++ make python3

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- build ---
FROM base AS build
RUN apk add --no-cache gcc g++ make python3

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# --- production ---
FROM base AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/db ./db
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/server.cjs ./server.cjs
COPY --from=build /app/start.sh ./start.sh

RUN chmod +x ./start.sh

EXPOSE 5500
ENV PORT=5500
ENV HOSTNAME="0.0.0.0"

CMD ["./start.sh"]
