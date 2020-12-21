FROM node as builder

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

RUN npm install typescript -g

COPY . .

EXPOSE 4000

RUN npx tsc

CMD node dist/index.js