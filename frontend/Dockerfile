#pre-combined version of node with oracle libraries
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

RUN apk add --update nodejs npm

# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run test:e2e
RUN npm run test:unit
RUN npm run build