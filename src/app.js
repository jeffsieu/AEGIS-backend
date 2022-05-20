const { User, Qualification } = require("../models");

const express = require("express");
const app = express();
app.use(express.json())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Takes in an array of JSON and inserts into the db
// Throws an error if user already exist
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
  
  // Gets all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  // Gets all qualifications
  app.get('/qualifications', async (req, res) => {
    try {
      const qualifications = await Qualification.findAll()
  
      return res.json(qualifications)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  // Truncate all tables
  app.delete('/delete', async (req, res) => {
    try {
      User.destroy({
        where: {},
        truncate: true
      })

      Qualification.destroy({
        where: {},
        truncate: true
      })
  
      return res.status(200).send("Records purged")
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  // TODO: Cross check a user's qualification for planning
  // app.get()

  // TODO: Create a blank model for a new month
  // app.post()

  // TODO: Add a user to the schedule
  // app.post()

  // TODO: Change an existing user on the schedule
  // app.update()
  
  // TODO: Remove a user from the schedule
  // app.delete()
  
  // TODO: Check if schedule is published
  // app.get()
  
  // TODO: Publish schedule
  // app.post()

  app.get("/test", (_req, res) =>  {
    res.status(200).send("Hello world")
  })

  module.exports = app;