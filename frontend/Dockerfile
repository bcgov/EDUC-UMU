#pre-combined version of node with oracle libraries
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

RUN apk update \
    && apk add
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_9.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

# Install NPM Dependencies
COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

RUN npm run test:e2e
RUN npm run test:unit
RUN npm run build