const request = require('supertest');

const app = require('../../../src/app');

describe('/api/main', () => {
  it('return all valid endpoints', async () => {
    const response = await request(app).get('/api/main');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({
      endpoints: [
        '/database',
        '/validation'
      ]
    });
  });
});

describe('/api/main/database', () => {
  it('should require validation', async () => {
    const response = await request(app).get('/api/main/database');
    expect(response.statusCode).toBe(401);
  });
});
