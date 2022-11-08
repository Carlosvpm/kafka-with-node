FROM node:alpine

WORKDIR /src/kafka-admin

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "run", "start"]