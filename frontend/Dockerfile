#start with java base image so we can run selenium
FROM openjdk:14-alpine

WORKDIR /opt/app-root/src

#add node and npm
RUN apk add --update nodejs npm

#RUN apk add chromium
#Can install firefox for e2e testing if needed
#RUN apk add --no-cache firefox-esr
# Install NPM Dependencies

COPY package*.json ./
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

EXPOSE 8080 443
#selenium can't find binaries for chrome or chromedriver, so e2e is disabled for now
#RUN npm run lint:fix
#RUN npm run test:e2e
#prepare application for deployment
RUN npm run build