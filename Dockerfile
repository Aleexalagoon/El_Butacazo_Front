FROM node:18
WORKDIR /El_Butacazo_Front

COPY package.json package-lock.json ./

COPY . . 

EXPOSE 3000

CMD ["node", "server.js"]

