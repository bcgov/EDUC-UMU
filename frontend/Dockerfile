#start with java base image so we can run selenium
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

#add node and npm
RUN apk add --update nodejs npm
RUN dpkg -i google-chrome-stable_current_amd64.deb; apk add -fy install
# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run lint:fix
RUN npm run test:e2e
#prepare application for deployment
RUN npm run build