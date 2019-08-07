FROM node:lts-alpine

# Move to App Folder
WORKDIR /opt/app-root/src

# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run test:e2e
RUN npm run test:unit
RUN npm run build