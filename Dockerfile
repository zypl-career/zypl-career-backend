# Stage 1: Build the back service
FROM node:18-alpine AS build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY ./packages/server/package.json ./packages/server/pnpm-lock.yaml ./
COPY ./packages/server/.env ./.env
RUN pnpm install

# Copy the rest of the application code and build the project
COPY ./packages/server ./
RUN pnpm run build

# Stage 2: Setup Postgres and back service in one container
FROM postgres:14.2

# Environment variables for Postgres
ENV POSTGRES_USER=career
ENV POSTGRES_PASSWORD=career!
ENV POSTGRES_DB=career

# Copy the built application from the previous stage
COPY --from=build /app /app

# Install dependencies for the back service
WORKDIR /app
RUN pnpm install --prod

# Expose the ports
EXPOSE 5432
EXPOSE ${PORT}

# Start both services using a simple script
CMD ["sh", "-c", "service postgresql start && node _/src/index.js"]
