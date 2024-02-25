# Paso 1: Elegir una imagen base
FROM node:latest

WORKDIR /usr/node/app

RUN npm i -g nodemon

COPY package*.json ./

RUN npm install


EXPOSE 3001

CMD [ "npm", "run", "dev" ]
