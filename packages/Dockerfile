# Stage 1: Build the back service
FROM node:18-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY ./packages/server/package.json ./packages/server/pnpm-lock.yaml ./
COPY ./packages/server/.env ./.env
RUN pnpm install

COPY ./packages/server ./
RUN pnpm run build

FROM postgres:14.2

ENV POSTGRES_USER=career
ENV POSTGRES_PASSWORD=career!
ENV POSTGRES_DB=career

COPY --from=build /app /app

WORKDIR /app
RUN pnpm install --prod

EXPOSE 5432
EXPOSE ${PORT}

CMD service postgresql start && node _/src/index.js
