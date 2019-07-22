FROM oraclelinux:7-slim
WORKDIR /opt/app-root/src

COPY package*.json ./

RUN npm install && \
    npm cache clean --force

COPY . .

EXPOSE 8080 1521 443
# Tell application how to serve build
CMD ["npm", "start"]