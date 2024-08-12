FROM node:18 AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
# COPY .env .env
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE ${PORT}
CMD ["node", "_/src/index.js" ]
