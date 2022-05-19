# AEGIS-backend

Hello World

# Install Redis

Go to https://redis.io/docs/getting-started/ to install Redis on your machine
# Run Sequelize

sequelize db:create
sequelize db:migrate
# (Not required if using Sequelize) Run Postgres in a docker container

docker-compose up -d

# Run API in docker container

docker build -t aegis-backend .