# syntax=docker/dockerfile:1

FROM node:16 AS base

ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /app

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

FROM base AS dependencies

RUN npm install

FROM dependencies AS runtime

COPY . .