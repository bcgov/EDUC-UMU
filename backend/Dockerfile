#pre-combined version of node with oracle libraries
FROM node:10

# Install NPM Dependencies
COPY package*.json ./
RUN npm ci
# --no-optional --production

# Build Application
COPY . /opt/app-root/src
RUN npm run build