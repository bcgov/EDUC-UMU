#start with java base image so we can run selenium
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

#add node and npm
RUN apk add --update nodejs npm

# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

#prepare application for deployment
RUN npm run build