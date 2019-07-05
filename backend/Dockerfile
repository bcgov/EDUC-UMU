#pre-combined version of node with oracle libraries
FROM node:10-alpine

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

RUN cd /opt/oracle/instantclient \
  && ln -s libclntsh.so.12.1 libclntsh.so \
  && ln -s libocci.so.12.1 libocci.so 

RUN echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"

# Install NPM Dependencies
COPY package*.json ./

#RUN rm -rf node_modules
RUN npm install
# --no-optional --production

COPY . /opt/app-root/src

EXPOSE 8080
# Tell application how to serve build
CMD ["npm", "start"]
#RUN node ./bin/www