# AEGIS-backend

Hello World

# Run Sequelize

sequelize db:create
sequelize db:migrate
# (Not required if using Sequelize) Run Postgres in a docker container

docker-compose up -d

# Run API in docker container

docker build -t aegis-backend .