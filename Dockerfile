# syntax=docker/dockerfile:1

FROM node:18-buster-slim

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

RUN npm install

COPY . .

EXPOSE 2000

CMD [ "npm", "start" ]