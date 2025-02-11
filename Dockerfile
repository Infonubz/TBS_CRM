# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build files from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]