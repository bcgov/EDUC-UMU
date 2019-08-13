const request = require('supertest');

const app = require('../../../src/app');

describe('/api/main', () => {
  it('should return all available endpoints', async () => {
    const response = await request(app).get('https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca/api/main');
  
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
