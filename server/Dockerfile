FROM node:20 AS build
WORKDIR /
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY .env .env
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE ${PORT}
CMD ["node", "_/index.js" ]
