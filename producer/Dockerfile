FROM node:alpine

WORKDIR /src/producer

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3333

CMD ["npm", "run", "start:producer"]