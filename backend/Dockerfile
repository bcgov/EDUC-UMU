#pre-combined version of node with oracle libraries
FROM collinestes/docker-node-oracle:8-alpine

WORKDIR /opt/app-root/src

# Install NPM Dependencies
COPY package*.json ./
RUN npm ci
# --no-optional --production

# Build Application
COPY . /opt/app-root/src
RUN npm run build