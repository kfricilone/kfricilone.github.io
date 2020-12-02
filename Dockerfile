# NodeJS Image
FROM node:current-alpine3.12

# Server port
EXPOSE 3000

# Create non-root user
RUN addgroup -S kfricilone && adduser -S kfricilone -G kfricilone

# Set node env variable
ENV NODE_ENV=production

# Set directory inside container
WORKDIR /app

# Install node packages first for cache
COPY [ "package.json", "package-lock.json*", "./" ]
RUN npm install --production

# Copy nodejs app
COPY . .

# Switch to non-root user
USER kfricilone:kfricilone

# Run the nodejs app
CMD [ "node", "app.js" ]
