import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';
import sequelize, {
  Member,
  Qualification,
  Role,
  Duty,
  Schedule,
} from '../models';
import { Op } from 'sequelize';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Gets all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.findAll();
    return res.json(members);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Takes in an array of JSON and inserts into the db
// Throws an error if member already exist
app.post('/members', async (req, res) => {
  try {
    await Member.create(req.body);
    return res.status(200).send('Member added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Gets all qualifications
app.get('/qualifications', async (req, res) => {
  try {
    const roles = await Qualification.findAll();
    return res.json(roles);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Takes in an array of JSON and inserts into the db
// Throws an error if qualification already exist
app.post('/qualifications', async (req, res) => {
  try {
    await Qualification.create(req.body);
    return res.status(200).send('Qualification added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Cross check a member's qualification for planning
// Callsign must be uppercase
app.get('/qualifications/:callsign', async (req, res) => {
  // check for valid input & prevent SQL injection
  const userQuery = req.params.callsign;
  const onlyLettersPattern = new RegExp('^[A-Za-z]+$');

  if (!userQuery.match(onlyLettersPattern)) {
    return res
      .status(400)
      .json({ err: 'No special characters and no numbers, please!' });
  }

  const callsign = req.params.callsign;

  try {
    const member: Member | null = await Member.findOne({
      where: { callsign: callsign },
    });

    if (!member) {
      return res.status(404).json('No member with given callsign');
    }

    const qualifications = Qualification.findAll({
      where: {
        memberId: member.id,
      },
    });

    return res.json(qualifications);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.json(roles);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post('/roles', async (req, res) => {
  try {
    await Role.create(req.body);
    return res.status(200).send('Role added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Gets all duties
app.get('/duties', async (req, res) => {
  try {
    const duties = await Duty.findAll();

    return res.json(duties);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Gets a specific member's duties
app.get('/duties/:callsign', async (req, res) => {
  // check for valid input & prevent SQL injection
  const userQuery = req.params.callsign;
  const onlyLettersPattern = new RegExp('^[A-Za-z]+$');

  if (!userQuery.match(onlyLettersPattern)) {
    return res
      .status(400)
      .json({ err: 'No special characters and no numbers, please!' });
  }

  const callsign = req.params.callsign;

  try {
    const member = await Member.findOne({
      where: { callsign: callsign },
    });

    if (!member) {
      return res.status(404).json('No member with given callsign');
    }

    const duties = Duty.findAll({
      where: {
        memberId: member.id,
      },
    });

    return res.json(duties);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Add duty
app.post('/duties', async (req, res) => {
  try {
    await Duty.create(req.body);
    return res.status(200).send('Duty added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Change an existing member's duty
app.put('/duties/:dutyId', async (req, res) => {
  const dutyId = req.params.dutyId;
  const newDuty = req.body;

  try {
    await Duty.update(newDuty, {
      where: {
        id: dutyId,
      },
    });

    return res.status(200).send('Duty updated');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// TODO: Gets individual's duties
// app.get()

// Create a blank model for a new month
app.post('/schedules', async (req, res) => {
  try {
    await Schedule.create(req.body);
    return res.status(200).send('Schedule created');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: ['duties'],
    });

    return res.json(schedules);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get specific month's schedule
app.get('/schedules/:month', async (req, res) => {
  // check for valid input & prevent SQL injection
  const userQuery = req.params.month;
  // takes the form DD-MM-YYYY
  const onlyValidDate = new RegExp(
    '^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\\d{4}$'
  );

  if (!userQuery.match(onlyValidDate)) {
    return res.status(400).json({ err: 'Only valid date please!' });
  }

  const scheduleMonth = new Date(req.params.month);
  scheduleMonth.setDate(1);

  try {
    const schedule = await Schedule.findAll({
      where: {
        month: {
          [Op.eq]: scheduleMonth,
        },
      },
    });

    if (!schedule) {
      return res.status(404).json('Requested schedule not found');
    }

    return res.json(schedule);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// TODO: Check if schedule is published
// app.get()

// TODO: Publish schedule
// app.post()

// Truncate all tables
app.delete('/delete', async (req, res) => {
  try {
    sequelize.sync({ force: true });

    return res.status(200).send('Records purged');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/test', async (req, res) => {
  try {
    return res.status(200).send('Hello world');
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default app;
