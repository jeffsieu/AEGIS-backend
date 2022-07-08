# Getting Started
https://docs.google.com/document/d/1MpZSeAPzID8Ty8JN6WoDGnBWmu1AueXSeQ3tYDeit2k

## Requirements
1. NodeJS
2. Docker 

## Set up AEGIS-backend
1. `npm install`
2. `docker-compose up -d`
3. `npx sequelize db:create`
4. `npm start`

## Stopping Docker

`docker-compose down`
## Run API in Docker container
1. `docker build -t aegis-backend .`
2. `docker run -p 2000:2000 aegis-backend`

# Run API tests
`docker-compose -f docker-compose.e2e.yml up --build --abort-on-container-exit --remove-orphans`