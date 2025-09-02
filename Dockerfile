# Use the official Bun image as the base
FROM oven/bun:latest AS base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and bun.lockb to install dependencies
COPY package.json bun.lockb ./

# Install project dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Expose the port your application listens on (if applicable)
EXPOSE 3000

# Command to run your application
CMD ["bun", "run", "start"]