# AEGIS-backend
Allows bulk insert up to 900 records in ~1.2s

1. npm install
2. node ./src/index.js

# Run Sequelize

1. sequelize db:create
2. sequelize db:migrate
# (Not required if using Sequelize) Run Postgres in a docker container

docker-compose up -d

# Run API in docker container

docker build -t aegis-backend .

# (Pending) Install Redis

Go to https://redis.io/docs/getting-started/ to install Redis on your machine