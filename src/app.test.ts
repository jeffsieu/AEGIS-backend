import app from './app';
import supertest from 'supertest';
import sequelize from '../models';

const req = supertest(app);

beforeAll(async () => {
  await sequelize.sync({ force: true });
})

describe('get all members', () => {
  it('should return a 200', async () => {
    const res = await req.get('/members');
    expect(res.status).toBe(200);
  });
});

describe('add members', () => {
  it('should return a 200', async () => {
    const res = await req.post('/members')
    .send({
      "callsign": "nano",
      "sqn": "18",
      "type": "MEMBER"});
    expect(res.status).toBe(200);
  });
});

describe('add members', () => {
  it('should return an error for symbols', async () => {
    const res = await req.post('/members')
    .send({
      "callsign": "nano",
      "sqn": "$$",
      "type": "hehe"});
    expect(res.status).toBe(400);
  });
});

describe('add members', () => {
  it('should return an error for wrong type', async () => {
    const res = await req.post('/members')
    .send({
      "callsign": "nano",
      "sqn": "18",
      "type": "hehe"});
    expect(res.status).toBe(400);
  });
});

describe('update members details', () => {
  it('should return 200', async () => {
    const res = await req.put('/members/1')
    .send({
      "callsign": "NANO",
      "sqn": "69",
      "type": "ADMIN"});
    expect(res.status).toBe(200);
  });
});

describe('update members details', () => {
  it('should return an error for wrong type', async () => {
    const res = await req.put('/members/1')
    .send({
      "callsign": "NANO",
      "sqn": "69",
      "type": "Memberr"});
    expect(res.status).toBe(400);
  });
});

describe('update members details', () => {
  it('should return an error for symbols', async () => {
    const res = await req.put('/members/1')
    .send({
      "callsign": "$NANO",
      "sqn": "69",
      "type": "Member"});
    expect(res.status).toBe(400);
  });
});

describe('get members availability for given month', () => {
  it('should return 200', async () => {
    const res = await req.get('/members/availability/2022-01-01');
    expect(res.status).toBe(200);
  });
});

describe('get all qualifications', () => {
  it('should return 200', async () => {
    const res = await req.get('/qualifications');
    expect(res.status).toBe(200);
  });
});

describe('get roles', () => {
  it('should return 200', async () => {
    const res = await req.get('/roles');
    expect(res.status).toBe(200);
  });
});

describe('add roles', () => {
  it('should return 200', async () => {
    const res = await req.post('/roles')
    .send({
      "name": "A2",
      "roleInstances": [{
        "roleId": "1",
        "role": "A2",
        "description": "Stby"
  }]});
    expect(res.status).toBe(200);
  });
});

describe('add roles', () => {
  it('should return error for wrong name', async () => {
    const res = await req.post('/roles')
    .send({
      "name": "$$",
      "roleInstances": [{
        "roleId": "1",
        "role": "A2",
        "description": "Stby"
  }]});
    expect(res.status).toBe(400);
  });
});

describe('add roles', () => {
  it('should return error for non-array of roleInstances', async () => {
    const res = await req.post('/roles')
    .send({
      "name": "A2",
      "roleInstances": {
        "roleId": "1",
        "role": "A2",
        "description": "Stby"
  }});
    expect(res.status).toBe(400);
  });
});

describe('get all roleInstances', () => {
  it('should return 200', async () => {
    const res = await req.get('/roleInstances');
    expect(res.status).toBe(200);
  });
});

describe('update members roles', () => {
  it('should return 200', async () => {
    const res = await req.put('/members/1/roles')
    .send({
      "name": "A2"});
    expect(res.status).toBe(200);
  });
});

describe('get a member qualifications', () => {
  it('should return 200', async () => {
    const res = await req.get('/qualifications/1');
    expect(res.status).toBe(200);
  });
});

describe('get all schedules', () => {
  it('should return 200', async () => {
    const res = await req.get('/schedules');
    expect(res.status).toBe(200);
  });
});

describe('add schedules', () => {
  it('should return 200', async () => {
    const res = await req.post('/schedules')
    .send({
      "month": "2022-01-01"});
    expect(res.status).toBe(200);
  });
});

describe('add schedules', () => {
  it('should return an error for wrong date format', async () => {
    const res = await req.post('/schedules')
    .send({
      "month": "01-01-2022"});
    expect(res.status).toBe(400);
  });
});

describe('get schedules of the next 3 months', () => {
  it('should return 200', async () => {
    const res = await req.get('/schedules/months');
    expect(res.status).toBe(200);
  });
});

describe('get schedule of a specific month', () => {
  it('should return 200', async () => {
    const res = await req.get('/schedules/2022-01-01');
    expect(res.status).toBe(200);
  });
});

describe('edit schedule of a specific month', () => {
  it('should return 200', async () => {
    const res = await req.put('/schedules/2022-01-01')
    .send({
      "month": "2022-01-01",
      "isPublished": false});
    expect(res.status).toBe(200);
  });
});

describe('get all duties', () => {
  it('should return 200', async () => {
    const res = await req.get('/duties');
    expect(res.status).toBe(200);
  });
});

describe('add duties', () => {
  it('should return 200', async () => {
    const res = await req.post('/duties')
    .send({
      "date": "2022-01-01",
      "memberId": "1",
      "roleId": "1",
      "roleInstanceId": "1",
      "scheduleId": "1"});
    expect(res.status).toBe(200);
  });
});

describe('add duties', () => {
  it('should return error for non-numeric values', async () => {
    const res = await req.post('/duties')
    .send({
      "date": "2022-01-01",
      "memberId": "hi",
      "roleId": "hi",
      "roleInstanceId": "hi",
      "scheduleId": "hi"});
    expect(res.status).toBe(400);
  });
});

describe('change duty', () => {
  it('should return 200', async () => {
    const res = await req.put('/duties/1')
    .send({
      "date": "2022-01-01",
      "memberId": "1",
      "roleId": "1",
      "roleInstanceId": "1",
      "scheduleId": "1"});
    expect(res.status).toBe(200);
  });
});

describe('add a batch of requests', () => {
  it('should return 200', async () => {
    const res = await req.post('/requests/batch')
    .send([{
      "dates": ["2022-01-01", "2022-01-02", "2022-01-03"],
      "reason": "Meeting",
      "type": "Work",
      "memberId": "1"}]);
    expect(res.status).toBe(200);
  });
});

describe('get requests', () => {
  it('should return 200', async () => {
    const res = await req.get('/requests');
    expect(res.status).toBe(200);
  });
});

describe('get a specific request', () => {
  it('should return 200', async () => {
    const res = await req.get('/requests/1');
    expect(res.status).toBe(200);
  });
});

describe('edit requests', () => {
  it('should return 200', async () => {
    const res = await req.put('/requests/1')
    .send({
      "dates": ["2022-01-01", "2022-01-02", "2022-01-03"],
      "reason": "Meeting",
      "type": "Work",
      "memberId": "1"});
    expect(res.status).toBe(200);
  });
});

describe('delete a batch of requests', () => {
  it('should return 200', async () => {
    const res = await req.delete('/requests/batch');
    expect(res.status).toBe(200);
  });
});