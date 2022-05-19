const { sequelize, User, Qualification } = require("../models");
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.json())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/addusers', async (req, res) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      const users = req.body.map(
        users => {
          return {
            callsign: users.Callsign,
            squadron: users.Squadron,
            role: users.Role
          }
        });
      await User.bulkCreate(users)

      const qualifications = req.body.map(
        users => {
          return {
            callsign: users.Callsign
          }
        });
      await Qualification.bulkCreate(qualifications)
    }

    return res.status(200).send("Users added")
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

app.get('/qualifications', async (req, res) => {
  try {
    const qualifications = await Qualification.findAll()

    return res.json(qualifications)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.delete('/delete', async (req, res) => {
  try {
    User.destroy({
      where: {},
      truncate: true
    })

    return res.status(200).send("Records purged")
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