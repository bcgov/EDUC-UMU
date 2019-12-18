#pre-combined version of node with oracle libraries
FROM oraclelinux:7-slim

WORKDIR /opt/app-root/src

ARG release=18
ARG update=3

# Install oracle instant client, node-oracle, and nodejs
RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs && \
     rm -rf /var/cache/yum
# Install telnet only to test connections to database and firewall accessibility(too bulky and unused otherwise)
# RUN yum -y install telnet telnet-server

# set environment variables required to find our database
ENV ORACLE_SID=edw2d.world
ENV TWO_TASK=edw2d.world

# Install NPM Dependencies
COPY package*.json ./

RUN npm ci
COPY . /opt/app-root/src

#Run a clean install of node dependencies
RUN npm run build
# --no-optional --production

EXPOSE 8080 1521 443
# Tell application how to serve build
CMD ["npm", "start"]