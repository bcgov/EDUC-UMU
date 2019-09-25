#start with java base image so we can run selenium
FROM node:lts-alpine

WORKDIR /opt/app-root/src

COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

EXPOSE 8080 443
RUN npm ci