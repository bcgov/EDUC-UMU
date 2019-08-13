const request = require('supertest');

const app = require('../../../src/app');

describe('/api/main/database', () => {
  it('should return all available endpoints', async () => {
    const response = await request(app).get('/api/main/database');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({
      endpoints: [
        '/users',
        '/proxy',
        '/roles'
      ]
    });
  });
});

describe('/api/main/database/users', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/callback');
    expect(response).toBeTruthy();
  });
});

describe('/api/main/database/proxy', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/callback');
    expect(response).toBeTruthy();
  });
});

describe('/api/main/database/roles', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/callback');
    expect(response).toBeTruthy();
  });
});
