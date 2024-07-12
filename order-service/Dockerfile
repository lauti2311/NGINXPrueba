FROM node:16-alpine

WORKDIR /order-service

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
