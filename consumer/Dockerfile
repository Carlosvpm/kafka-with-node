FROM node:alpine

WORKDIR /src/consumer

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 4444

CMD ["npm", "run", "start:consumer"]