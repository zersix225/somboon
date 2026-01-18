ARG NODE_VERSION=22
ARG PNPM_VERSION=9.4.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=development

CMD ["sh", "-c", "pnpm prisma:dev"]
