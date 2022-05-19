const { sequelize } = require("../models");
const app = require( "./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await sequelize.authenticate()
  console.log("Database Connected!")
});