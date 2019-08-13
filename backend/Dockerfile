#pre-combined version of node with oracle libraries
FROM oraclelinux:7-slim

WORKDIR /opt/app-root/src

ARG release=18
ARG update=3

# Install oracle instant client, node-oracle, and nodejs
RUN  yum -y install oracle-release-el7 && yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
     rm -rf /var/cache/yum && \
     echo /usr/lib/oracle/${release}.${update}/client64/lib > /etc/ld.so.conf.d/oracle-instantclient${release}.${update}.conf && \
     ldconfig

ENV PATH=$PATH:/usr/lib/oracle/${release}.${update}/client64/bin

RUN yum -y install oracle-nodejs-release-el7 oracle-release-el7
RUN yum -y install --disablerepo=ol7_developer_EPEL nodejs node-oracledb-node10
# Install telnet only to test connections to database and firewall accessibility(too bulky and unused otherwise)
# RUN yum -y install telnet telnet-server

# set environment variables required to find our database
ENV ORACLE_SID=edw2d.world
ENV TWO_TASK=edw2d.world

# Install NPM Dependencies
COPY package*.json ./

# RUN rm -rf node_modules
RUN npm install
COPY . /opt/app-root/src

EXPOSE 8080 1521 443

RUN npm run build
RUN npm run lint:fix
RUN npm run test
# --no-optional --production


# Tell application how to serve build
CMD ["npm", "start"]