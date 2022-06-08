# Getting Started
https://docs.google.com/document/d/1MpZSeAPzID8Ty8JN6WoDGnBWmu1AueXSeQ3tYDeit2k

# Set up AEGIS-backend
1. npm install
2. docker-compose up -d
3. sequelize db:create
4. sequelize db:migrate
5. nodemon ./src/index.js

## Stopping Sequelize

1. (reverse migrate) sequelize db:migrate:undo:all

## Stopping Docker

1. docker-compose down
## Run API in Docker container

docker build -t aegis-backend .