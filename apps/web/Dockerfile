FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/shadcn ./packages/shadcn
COPY packages/api ./packages/api
COPY packages/rslib-config ./packages/rslib-config
COPY packages/typescript-config ./packages/typescript-config
COPY packages/tailwild-config ./packages/tailwild-config
COPY apps/web/package.json ./apps/web/
COPY apps/web ./apps/web

RUN corepack enable && corepack prepare --activate
RUN pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm run build --filter=web

FROM node:24-alpine AS production
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
RUN corepack enable && corepack prepare --activate

COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules

EXPOSE 3000

CMD ["pnpm", "--filter=web", "run", "start"]