FROM node:latest
WORKDIR /api
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
EXPOSE 7070
RUN npm run build
CMD node _/index.js