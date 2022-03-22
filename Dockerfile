FROM node:16.14

WORKDIR /usr/src/app

COPY src ./src
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
EXPOSE 8081
CMD [ "npm", "start" ]
