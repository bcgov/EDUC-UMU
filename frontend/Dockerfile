#start with java base image so we can run selenium
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

#add node and npm
RUN apk add --update nodejs npm

# Install NPM Dependencies
COPY package*.json ./
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

#Run e2e tests on localhost
#RUN npm run test:e2e

#Run unit tests on static code
RUN npm run test:unit

#prepare application for deployment
RUN npm run build