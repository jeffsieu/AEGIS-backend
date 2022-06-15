import express, { Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dayjs, { Dayjs } from 'dayjs';
import { body, param, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import sequelize, {
  Member,
  Qualification,
  Role,
  Duty,
  Schedule,
  Request,
} from '../models';
import { Op } from 'sequelize';

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

async function getMemberWithId(
  res: Response,
  id: string
): Promise<Member | Response> {
  // check for valid input & prevent SQL injection
  const onlyDigitsPattern = /^\d+$/;

  if (!id.match(onlyDigitsPattern)) {
    return res.status(400).json({ err: 'Member id must be a number' });
  }

  const member: Member | null = await Member.findOne({
    where: { id },
  });

  if (!member) {
    return res.status(404).json('No member with given id');
  }

  return member;
}

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
      order: [['callsign', 'ASC']],
    });
    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post('/members', 
body('callsign').isAlpha(), 
body('squadron').isAlphanumeric('en-US', {ignore: ' '}), 
body('type').isIn(['member', 'admin', 'Member', 'Admin', 'MEMBER', 'ADMIN']), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const member = await Member.create(req.body);
    return res.status(200).json(member.id);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put('/members/:id', 
body('callsign').isAlpha(), 
body('squadron').isAlphanumeric('en-US', {ignore: ' '}), 
body('type').isIn(['member', 'admin', 'Member', 'Admin', 'MEMBER', 'ADMIN']), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result: Member | Response = await getMemberWithId(res, req.params?.id);

    if (!(result instanceof Member)) {
      return result;
    }

    const member = result;
    
    await member.update(req.body);
    return res.status(200).send('Member updated');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put('/members/:id/roles', 
param('id').isNumeric(),  
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result: Member | Response = await getMemberWithId(res, req.params?.id);

    if (!(result instanceof Member)) {
      return result;
    }

    const member = result;
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

app.get('/members/availability/:month', 
param('month').isDate(), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const month = req.params?.month;
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
              '(SELECT COUNT(*) FROM "Duties" WHERE "Duties"."memberId" = "Member".id AND "Duties"."date" BETWEEN \'' +
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

    const relevantRequests = await Request.findAll({
      where: {
        startDate: {
          [Op.lte]: endDate,
        },
        endDate: {
          [Op.gte]: startDate,
        },
      },
    });

    const membersWithRequests = members.map((member) => {
      const memberWithRequests = member.get({ plain: true });
      const requests = relevantRequests.filter(
        (request) => request.memberId === member.id
      );
      memberWithRequests.requests = requests;
      return memberWithRequests;
    });

    return res.status(200).json(membersWithRequests);
  } catch (err) {
    console.log(err);
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
app.post('/qualifications', 
body('memberId').isNumeric({no_symbols: true}), 
body('roleId').isNumeric({no_symbols: true}), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await Qualification.create(req.body);
    return res.status(200).send('Qualification added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Cross check a member's qualification for planning
// Callsign must be uppercase
app.get('/qualifications/:id', async (req, res) => {
  try {
    const result: Member | Response = await getMemberWithId(res, req.params.id);

    if (!(result instanceof Member)) {
      return result;
    }

    const member = result;

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

app.post('/roles', 
body('name').isAlphanumeric('en-US', {ignore: ' '}),  
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  try {
    const result: Member | Response = await getMemberWithId(
      res,
      req.params.callsign
    );

    if (!(result instanceof Member)) {
      return result;
    }

    const member = result;

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
app.post('/duties', 
body('memberId').isNumeric({no_symbols: true}), 
body('scheduleId').isNumeric({no_symbols: true}), 
body('roleId').isNumeric({no_symbols: true}), 
body('date').isDate(), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    await Duty.create(req.body);
    return res.status(200).send('Duty added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Change an existing member's duty
app.put('/duties/:dutyId', 
param('dutyId').isNumeric({no_symbols: true}), 
body('memberId').isNumeric({no_symbols: true}), 
body('scheduleId').isNumeric({no_symbols: true}), 
body('roleId').isNumeric({no_symbols: true}), 
body('date').isDate(), 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  
  }

  const dutyId = req.params?.dutyId;
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

// Create a blank model for a new month
app.post('/schedules',  
body('month').isDate(), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await Schedule.create(req.body, {
      include: [Duty],
    });
    return res.status(200).send('Schedule created');
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/schedules', async (req, res) => {
  try {
    const isPublished = req.query.isPublished;
    const schedules = await Schedule.findAll({
      include: [Duty],
      where:
        isPublished !== undefined
          ? {
              isPublished: isPublished === 'true',
            }
          : {},
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
// Input must be YYYY-MM-01
app.get('/schedules/:month', 
param('month').isDate(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const scheduleMonth = new Date(req.params?.month);
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

app.put('/schedules/:month', 
param('month').isDate(),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const scheduleMonth = new Date(req.params?.month);
  scheduleMonth.setDate(1);

  try {
    const schedules = await Schedule.findAll({
      where: {
        month: {
          [Op.eq]: scheduleMonth,
        },
      },
    });

    if (schedules.length === 0) {
      return res.status(404).json('Requested schedule not found');
    }

    await Schedule.update(req.body, {
      where: {
        month: {
          [Op.eq]: scheduleMonth,
        },
      },
    });

    for (const schedule of schedules) {
      const duties = await Duty.findAll({
        where: {
          scheduleId: schedule.id,
        },
      });

      for (const duty of duties) {
        duty.memberId = req.body.duties.find(
          (d: any) =>
            d.roleId === duty.roleId &&
            dayjs(d.date).isSame(duty.date, 'day')
        )?.memberId ?? null;
        await duty.save();
      }
    }

    return res.status(200).send('Schedule updated');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get('/requests', async (req, res) => {
  try {
    const memberId = req.query.memberId;

    const requests = await Request.findAll({
      include: [Member],
      where:
        memberId !== undefined
          ? {
              memberId: +memberId,
            }
          : undefined,
    });
    return res.json(requests);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/requests/:id', 
param('id').isNumeric({no_symbols: true}), 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params?.id;
    const requests = await Request.findOne({
      where: {
        id: +id,
      },
    });

    return res.json(requests);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Not required in MVP
app.post('/requests/batch', async (req, res) => {
  try {
    await Request.bulkCreate(req.body);
    return res.status(200).send('Requests added');
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Truncate all tables
app.delete('/delete', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
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
