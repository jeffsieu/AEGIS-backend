# syntax=docker/dockerfile:1

FROM node:16

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

RUN npm install

COPY . .

EXPOSE 2000

CMD [ "npm", "start" ]