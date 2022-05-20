const { User, Qualification } = require("../models");

const express = require("express");
// to use after deployment
// const cors = require("cors") 
// app.use(cors())
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
      return res.status(500).json(err)
    }
  })
  
  // Gets all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  
  // Gets all qualifications
  app.get('/qualifications', async (req, res) => {
    try {
      const qualifications = await Qualification.findAll()
  
      return res.json(qualifications)
    } catch (err) {
      return res.status(500).json(err)
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
      return res.status(500).json(err)
    }
  })
  
  // Cross check a user's qualification for planning
  // Callsign must be uppercase
  app.get('/qualifications/:callsign', async (req, res) => {
    // check for valid input & prevent SQL injection
    const userQuery = req.params.callsign;
    const onlyLettersPattern = new RegExp('^[A-Za-z]+$')

    if(!userQuery.match(onlyLettersPattern)){
      return res.status(400).json({ err: "No special characters and no numbers, please!"})
    }

    const callsign = req.params.callsign

    try {
      const user = await Qualification.findOne({
        where: { callsign },
      })
  
      return res.json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  })

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