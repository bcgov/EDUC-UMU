#start with java base image so we can run selenium
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

#add node and npm
RUN apk add --update nodejs npm

# Install NPM Dependencies
COPY package*.json ./
RUN npm run reinstall
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run test:unit
RUN npm run build