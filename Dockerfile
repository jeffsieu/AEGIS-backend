# syntax=docker/dockerfile:1

FROM node:16

ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

RUN npm install

COPY . .

EXPOSE 2000

CMD [ "npm", "start" ]