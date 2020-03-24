FROM node:12.14.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY ./dist .

EXPOSE 3000
CMD ["npm", "server"]

