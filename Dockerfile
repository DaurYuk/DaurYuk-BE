FROM node:lts-alpine

# Change directory to app
RUN mkdir /app
WORKDIR /app

# Copy needed modules and files to run backend
COPY src /app/src
COPY index.js /app/index.js
COPY package.json /app/package.json

# Run npm i
RUN npm install --omit=dev

# Adjust container user
RUN addgroup -S runner && adduser -S runner -G runner
USER runner

# Expose port 8080
EXPOSE 8080

# Define entrypoint for run the Backend
ENTRYPOINT [ "node", "index.js" ]

