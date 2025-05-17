# 1. Start with a base image
FROM node:18-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the application code
COPY . .

# 5. Expose a port (for runtime access)
EXPOSE 3001

# 6. Define default command
CMD ["npm", "dev"]
