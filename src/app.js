/* eslint-disable no-undef */
const { Member, Qualification, Duty,  Role, Schedule } = require("../models");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Gets all members
app.get("/members", async (req, res) => {
  try {
    const members = await Member.findAll({
      include: ["roles", "duties"]
    });

    return res.json(members);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Takes in an array of JSON and inserts into the db
// Throws an error if member already exist
app.post("/addmembers", async (req, res) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      const members = req.body.map(
        members => {
          return {
            callsign: members.Callsign,
            squadron: members.Squadron,
            role: members.Role
          };
        });
      await Member.bulkCreate(members);
    }
    return res.status(200).send("Members added");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Gets all qualifications
app.get("/qualifications", async (req, res) => {
  try {
    const roles = await Role.findAll();

    return res.json(roles);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Takes in an array of JSON and inserts into the db
// Throws an error if qualification already exist
app.post("/addqualifications", async (req, res) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      const qualifications = req.body.map(
        qualifications => {
          return {
            callsign: qualifications.Callsign,
            role_id: qualifications.Role
          };
        });
      await Qualification.bulkCreate(qualifications);

      const roles = req.body.map(
        qualifications => {
          return {
            role_id: qualifications.Role
          };
        });
      await Role.bulkCreate(roles);
    }
    return res.status(200).send("Qualification added");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Cross check a member's qualification for planning
// Callsign must be uppercase
app.get("/qualifications/:callsign", async (req, res) => {
  // check for valid input & prevent SQL injection
  const userQuery = req.params.callsign;
  const onlyLettersPattern = new RegExp("^[A-Za-z]+$");

  if (!userQuery.match(onlyLettersPattern)) {
    return res.status(400).json({ err: "No special characters and no numbers, please!" });
  }

  const callsign = req.params.callsign;

  try {
    const member = await Qualification.findOne({
      where: { callsign },
    });

    if (!member) {
      return res.status(404).json("Requested member not found");
    }

    return res.json(member);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Gets all duties
app.get("/duties", async (req, res) => {
  try {
    const duties = await Duty.findAll();

    return res.json(duties);
  } catch (err) {
    return res.status(500).json(err);
  }
});// Gets all duties
app.get("/duties", async (req, res) => {
  try {
    const duties = await Duty.findAll();

    return res.json(duties);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// TODO
// Create a blank model for a new month
app.post("/new", async (req, res) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      const schedules = req.body.map(
        schedule => {
          return {
            month: schedule.Month
          };
        });
      await Schedule.bulkCreate(schedules);
    }

    // console.log(res.body);

    return res.status(200).send("Schedule created");
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/schedules", async (req, res) => {
  try {
    const schedules = await Schedule.findAll();

    return res.json(schedules);
  } catch (err) {
    return res.status(500).json(err);
  }
});

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

// Truncate all tables
app.delete("/delete", async (req, res) => {
  try {
    Member.destroy({
      where: {},
      truncate: true
    });

    Qualification.destroy({
      where: {},
      truncate: true
    });

    Role.destroy({
      where: {},
      truncate: true
    });

    Duty.destroy({
      where: {},
      truncate: true
    });

    Schedule.destroy({
      where: {},
      truncate: true
    });

    return res.status(200).send("Records purged");
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/test", (_req, res) => {
  res.status(200).send("Hello world");
});

module.exports = app;