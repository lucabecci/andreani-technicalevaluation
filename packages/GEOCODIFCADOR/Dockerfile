FROM node as builder

WORKDIR /usr/geo

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 4000

CMD node dist/index.js