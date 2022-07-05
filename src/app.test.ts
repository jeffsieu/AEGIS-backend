jest.useFakeTimers()
import app from './app';
import supertest from 'supertest';
const request = supertest(app);

describe('/test endpoint', () => {
  it('should return a response', async () => {
    const response = await request.get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
  });
});

describe('test members', () => {
  it('should return a response', async () => {
    const response = await request.get('/members');
    expect(response.status).toBe(200);
  });
});

describe('test qualifications', () => {
  it('should return a response', async () => {
    const response = await request.get('/qualifications');
    expect(response.status).toBe(200);
  });
});

describe('test roles', () => {
  it('should return a response', async () => {
    const response = await request.get('/roles');
    expect(response.status).toBe(200);
  });
});

describe('test duties', () => {
  it('should return a response', async () => {
    const response = await request.get('/duties');
    expect(response.status).toBe(200);
  });
});

describe('test schedules', () => {
  it('should return a response', async () => {
    const response = await request.get('/schedules');
    expect(response.status).toBe(200);
  });
});

describe('test requests', () => {
  it('should return a response', async () => {
    const response = await request.get('/requests');
    expect(response.status).toBe(200);
  });
});

describe('test delete', () => {
  it('should return a response', async () => {
    const response = await request.delete('/delete');
    expect(response.status).toBe(200);
  });
});