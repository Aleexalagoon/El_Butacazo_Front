FROM node:lts-alpine

WORKDIR /El_Butacazo_Front

COPY package.json package-lock.json ./

RUN npm install --production

COPY . . 

EXPOSE 3000

CMD ["node", "server.js"]

