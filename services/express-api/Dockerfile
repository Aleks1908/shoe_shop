FROM node:23-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 6969

CMD ["npm", "start"]  

