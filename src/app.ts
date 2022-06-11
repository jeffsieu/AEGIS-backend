import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dayjs, { Dayjs } from 'dayjs';

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

app.get('/members', async (req, res) => {
  try {
    const includeRoles = req.query.includeRoles;
    const includeDuties = req.query.includeDuties;
    const include = [];
    if (includeRoles) {
      include.push(Role);
    }
    if (includeDuties) {
      include.push(Duty);
    }

    const members = await Member.findAll({
      include: include,
    });
    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post('/members', async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.status(200).send('Member added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put('/members/:callsign', async (req, res) => {
  try {
    const callsign = req.params.callsign;
    const member = await Member.findOne({
      where: { callsign },
    });
    if (!member) {
      return res.status(404).send('Member not found');
    }
    await member.update(req.body);
    return res.status(200).send('Member updated');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put('/members/:callsign/roles', async (req, res) => {
  try {
    const callsign = req.params.callsign;
    const member = await Member.findOne({
      where: { callsign },
    });
    if (!member) {
      return res.status(404).send('Member not found');
    }
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.in]: req.body,
        },
      },
    });
    await member.$set('roles', roles);
    return res.status(200).send('Member updated');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/members/availability/:month', async (req, res) => {
  try {
    const month = req.params.month;
    const dayjsMonth = dayjs(month);
    const startDate = dayjsMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = dayjsMonth.endOf('month').format('YYYY-MM-DD');

    // Include calculated duty count
    const members = await Member.findAll({
      include: [Role],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "Duties" WHERE "Duties"."memberId" = Member.id AND "Duties"."date" BETWEEN \'' +
                startDate +
                "' AND '" +
                endDate +
                "')"
            ),
            'dutyCount',
          ],
        ],
      },
    });

    return res.status(200).json(members);
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
    const qualification = await Qualification.create(req.body);
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
    const role = await Role.create(req.body);
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
    const duty = await Duty.create(req.body);
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
    const schedule = await Schedule.create(req.body, {
      include: [Duty],
    });
    return res.status(200).send('Schedule created');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [Duty],
    });

    return res.json(schedules);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Return months within the next 12 months that have not yet been planned
app.get('/schedules/months', async (req, res) => {
  try {
    const startDate = dayjs().startOf('month');
    const endDate = startDate.clone().add(12, 'month');

    const plannedMonths = (
      await Schedule.findAll({
        attributes: ['month'],
        group: ['month'],
        where: {
          month: {
            [Op.gte]: startDate.toDate(),
            [Op.lte]: endDate.toDate(),
          },
        },
      })
    ).map((schedule) => dayjs(schedule.month));

    const months: Dayjs[] = [];

    for (let i = 0; i < 12; i++) {
      const date = startDate.add(i, 'month');
      if (!plannedMonths.some((month) => month.isSame(date, 'month'))) {
        months.push(date);
      }
    }

    return res.json(months.map((month) => month.format('YYYY-MM-DD')));
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get specific month's schedules
app.get('/schedules/:month', async (req, res) => {
  // check for valid input & prevent SQL injection
  const userQuery = req.params.month;
  // takes the form YYYY-MM
  const onlyValidDate = new RegExp('^\\d{4}[-](0?[1-9]|1[012])$');

  if (!userQuery.match(onlyValidDate)) {
    return res.status(400).json({ err: 'Only valid date please!' });
  }

  const scheduleMonth = new Date(req.params.month);
  scheduleMonth.setDate(1);

  try {
    const schedule = await Schedule.findAll({
      include: [Duty],
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
