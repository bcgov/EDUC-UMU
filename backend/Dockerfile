#pre-combined version of node with oracle libraries
FROM oraclelinux:7.6

WORKDIR /opt/app-root/src

ARG release=18
ARG update=3

RUN  yum -y install oracle-release-el7 && yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
     rm -rf /var/cache/yum
RUN yum -y install oracle-node-release-el7 oracle-release-el7
RUN yum -y install --disablerepo=ol7_developer_EPEL nodejs node-oracledb-node10

# TODO: Find SID for database

# Install NPM Dependencies
COPY package*.json ./

#RUN rm -rf node_modules
RUN npm install
# --no-optional --production

COPY . /opt/app-root/src

EXPOSE 8080 1521 443
# Tell application how to serve build
CMD ["npm", "start"]