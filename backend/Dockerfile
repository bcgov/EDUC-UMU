FROM registry.access.redhat.com/rhoar-nodejs/nodejs-10:latest
COPY ./oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm ./
COPY ./oracle-instantclient12.2-devel-12.2.0.1.0-1.x86_64.rpm ./
USER root
RUN rpm -ivh http://mirror.centos.org/centos/7/os/x86_64/Packages/libaio-0.3.109-13.el7.x86_64.rpm && \
    rpm -Uvh oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm && \
    rpm -Uvh oracle-instantclient12.2-devel-12.2.0.1.0-1.x86_64.rpm
RUN sed -i   's/npm install/npm install -g yarn webpack \&\& yarn install \&\& NODE_ENV="production" webpack -p/g' /usr/libexec/s2i/assemble
RUN echo 'bin/www' > /usr/libexec/s2i/run
USER 1001
ENV LD_LIBRARY_PATH="/usr/lib/oracle/12.2/client64/lib":$LD_LIBRARY_PATH
ENV OCI_HOME="/usr/lib/oracle/12.2/client64"
ENV OCI_LIB_DIR="/usr/lib/oracle/12.2/client64/lib"
EXPOSE 3000