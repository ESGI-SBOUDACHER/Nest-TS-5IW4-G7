FROM node:18-alpine

# RUN apt-get update
# RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run", "start:dev"]
