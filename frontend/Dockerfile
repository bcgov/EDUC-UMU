FROM node:lts-alpine

# Move to App Folder
WORKDIR /opt/app-root/src

RUN sudo apt-get update
RUN sudo apt-get install -y openjdk-8-jdk

# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run test:e2e
RUN npm run test:unit
RUN npm run build