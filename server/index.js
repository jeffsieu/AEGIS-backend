const express = require("express");

const { sequelize, User } = require("../models");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

app.post('/adduser', async (req, res) => {
  const { callsign, squadron, role } = req.body

  try {
    const user = await User.create({ callsign, squadron, role })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  await sequelize.authenticate()
  console.log("Database Connected!")
});