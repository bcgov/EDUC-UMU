#pre-combined version of node with oracle libraries
FROM node:10-stretch

WORKDIR /opt/app-root/src

RUN apt-get update \
 && apt-get install -y libaio1 \
 && apt-get install -y build-essential \
 && apt-get install -y unzip \
 && apt-get install -y curl

#ADD ORACLE INSTANT CLIENT
RUN mkdir -p opt/oracle
ADD ./oracle/linux/ .

# 12.2
RUN unzip instantclient-basic-linux.x64-12.2.0.1.0 -d /opt/oracle \
 && mv /opt/oracle/instantclient_12_2 /opt/oracle/instantclient

RUN unzip instantclient-basic-linux.x64-12.2.0.1.0.zip -d /opt/oracle \
 && unzip instantclient-sdk-linux.x64-12.2.0.1.0.zip -d /opt/oracle  \
 && mv /opt/oracle/instantclient_12_2 /opt/oracle/instantclient \
 && ln -s /opt/oracle/instantclient/libclntsh.so.12.2 /opt/oracle/instantclient/libclntsh.so \
&& ln -s /opt/oracle/instantclient/libocci.so.12.2 /opt/oracle/instantclient/libocci.so

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"
ENV OCI_HOME="/opt/oracle/instantclient"
ENV OCI_LIB_DIR="/opt/oracle/instantclient"
ENV OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include"
ENV OCI_VERSION=12

RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig

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