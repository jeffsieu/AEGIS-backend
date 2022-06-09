# Getting Started
https://docs.google.com/document/d/1MpZSeAPzID8Ty8JN6WoDGnBWmu1AueXSeQ3tYDeit2k

## Requirements
1. NodeJS
2. Docker 

## Set up AEGIS-backend
1. `npm install`
2. `docker-compose up -d`
3. `sequelize db:create`
4. `nodemon ./src/index.ts`

## Stopping Docker

`docker-compose down`
## Run API in Docker container

`docker build -t aegis-backend .`