## Getting Started
https://docs.google.com/document/d/1MpZSeAPzID8Ty8JN6WoDGnBWmu1AueXSeQ3tYDeit2k

## Set up AEGIS-backend
1. npm install
2. nodemon ./src/index.js

## Run Sequelize

1. sequelize db:create
2. sequelize db:migrate
3. (clear db) sequelize db:drop, (rever migrate) sequelize db:migrate:undo:all

## Run MSSQL in a docker container

docker-compose up -d

## Run API in docker container

docker build -t aegis-backend .