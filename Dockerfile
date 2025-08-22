# Use Node.js LTS
FROM node:18

# Set working directory inside container
WORKDIR /

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (your app.js likely runs on 3000)
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
