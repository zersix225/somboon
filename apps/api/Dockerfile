FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api ./apps/api
COPY packages/api ./packages/api
COPY packages/rslib-config ./packages/rslib-config

RUN corepack enable && corepack prepare --activate
RUN pnpm install --frozen-lockfile
RUN pnpm run build --filter=@repo/api

EXPOSE 3000

CMD ["node", "apps/api/src/index.ts"]