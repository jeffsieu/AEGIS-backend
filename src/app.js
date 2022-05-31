const { Member, Qualification, Duty } = require("../models")

const express = require("express")
const helmet = require("helmet")
const cors = require("cors") 
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// Takes in an array of JSON and inserts into the db
// Throws an error if member already exist
app.post('/addmembers', async (req, res) => {
    try {
      if (req.body && Array.isArray(req.body)) {
        const members = req.body.map(
          members => {
            return {
              callsign: members.Callsign,
              squadron: members.Squadron,
              role: members.Role
            }
          });
        await Member.bulkCreate(members)

        const qualifications = req.body.map(
          members => {
            return {
              callsign: members.Callsign
            }
          });
        await Qualification.bulkCreate(qualifications)

        const duties = req.body.map(
          members => {
            return {
              callsign: members.Callsign
            }
          });
        await Duty.bulkCreate(duties)
      }
  
      return res.status(200).send("Members added")
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  
  // Gets all members
  app.get('/members', async (req, res) => {
    try {
      const members = await Member.findAll({
        include: 'qualifications'
      })
  
      return res.json(members)
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

  // Gets all duties
  app.get('/duties', async (req, res) => {
    try {
      const duties = await Duty.findAll()
  
      return res.json(duties)
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  
  // Truncate all tables
  app.delete('/delete', async (req, res) => {
    try {
      Member.destroy({
        where: {},
        truncate: true
      })

      Qualification.destroy({
        where: {},
        truncate: true
      })

      Duty.destroy({
        where: {},
        truncate: true
      })
  
      return res.status(200).send("Records purged")
    } catch (err) {
      return res.status(500).json(err)
    }
  })
  
  // Cross check a member's qualification for planning
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
      const member = await Qualification.findOne({
        where: { callsign },
      })

      if (!member) {
        return res.status(404).json("Requested member not found")
      }
  
      return res.json(member)
    } catch (err) {
      return res.status(500).json(err)
    }
  })

  // TODO: Create a blank model for a new month
  // app.post()

  // TODO: Add a member to the schedule
  // app.post()

  // TODO: Change an existing member on the schedule
  // app.update()
  
  // TODO: Remove a member from the schedule
  // app.delete()
  
  // TODO: Check if schedule is published
  // app.get()
  
  // TODO: Publish schedule
  // app.post()

  app.get("/test", (_req, res) =>  {
    res.status(200).send("Hello world")
  })

  module.exports = app;