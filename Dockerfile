# Using a multi-stage build

# 1. Build stage
FROM node:alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm ci command
COPY package*.json /app

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# 2. Runtime stage
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy from the build stage the built application and the node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Set the start command
CMD ["npm", "start"]
