# Use a Node.js base image
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./multipro_web/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./multipro_web .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Use serve to serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]
