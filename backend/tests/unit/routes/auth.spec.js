const request = require('supertest');
const auth = require('../../../src/components/auth');
const app = require('../../../src/app');

const endlessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlYjIzYjdmYy00Yzg5LTQ1NTYtYTI5YS02Mzk4N2Y3ZTRiYjEifQ.eyJqdGkiOiI5Y2Q4MGZmNy0xMDI1LTQwNzUtOGM0NS03YmEyODdkMmM3OWUiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNTY1MjgzMjMwLCJpc3MiOiJodHRwczovL3Nzby1kZXYucGF0aGZpbmRlci5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvanNnYnFsaXAiLCJhdWQiOiJodHRwczovL3Nzby1kZXYucGF0aGZpbmRlci5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvanNnYnFsaXAiLCJzdWIiOiJiYzRiMWFkZi1lNjQxLTQ3OTItOWJjMC0xYzdjOGI4MzNhZmYiLCJ0eXAiOiJPZmZsaW5lIiwiYXpwIjoidW11LWF1dGgiLCJub25jZSI6ImNjNzUzNDJiLTU0OTYtNDdkNy1hYjg0LWRjMDgyMTE1YjkwMSIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjdjMTk0NTY3LWYxMTctNGU5OC1iNDI3LWIxMGI0MjVhYjliNSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBvZmZsaW5lX2FjY2VzcyJ9.qNx9bvLd6cWXeiFQjUOQcwE1YFM6zxKFEd7QRagsR3Y';
const validToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1VllTUUlUX1B4N05FUnZaMk45bXcwMW9UMVhJbnIyUjZFcEJFRGtpRUdrIn0.eyJqdGkiOiJkOTJkYTFkYS00ZGMzLTRjMjMtODllOC04YzQ1OTU3MDJmMzkiLCJleHAiOjE1NjUyODM1MzAsIm5iZiI6MCwiaWF0IjoxNTY1MjgzMjMwLCJpc3MiOiJodHRwczovL3Nzby1kZXYucGF0aGZpbmRlci5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvanNnYnFsaXAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiYmM0YjFhZGYtZTY0MS00NzkyLTliYzAtMWM3YzhiODMzYWZmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidW11LWF1dGgiLCJub25jZSI6ImNjNzUzNDJiLTU0OTYtNDdkNy1hYjg0LWRjMDgyMTE1YjkwMSIsImF1dGhfdGltZSI6MTU2NTI4MzIyOSwic2Vzc2lvbl9zdGF0ZSI6IjdjMTk0NTY3LWYxMTctNGU5OC1iNDI3LWIxMGI0MjVhYjliNSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgb2ZmbGluZV9hY2Nlc3MiLCJuYW1lIjoiTmF0aGFuIERlbm55IiwicHJlZmVycmVkX3VzZXJuYW1lIjoibmRlbm55QGlkaXIiLCJnaXZlbl9uYW1lIjoiTmF0aGFuIiwiZmFtaWx5X25hbWUiOiJEZW5ueSIsImVtYWlsIjoibmF0aGFuLmRlbm55QGdvdi5iYy5jYSJ9.RuqnASGtVUK0p8QAzqecArEA6cWpCBRIBmTeNBkEuxawbwwXheK3mBYDDFgtlrNF8YHm6AgNkuhFiYlLKmbCfaErDbjzIkeXoFfYeyIALbFn0ucogi8WudUCmmnCsSs9nV1GvkbPIGdZ0QgJWvj2tp2qSoBX7Dy1fukOs4CK5C9NkPKoVvl5p2Hl59lwaS-xOIbmeHJX17WQzokzKTgdZe2wsm5p4YDie_1QLz8o8fRdSFI2_AVv9YMDjgLXWN4fc7KQNWx3Ovk1NkXxNQ6fA0DwjeyQvZnMop56ZkzWpgamvuK6tnwSVVbVFOt0Gz4nznjogDgToPThe9BJmpV2HA';

describe('/api/auth', () => {
    it('should return all available endpoints', async () => {
      const response = await request(app).get('/api/auth');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body).toEqual({
        endpoints: [
          '/callback',
          '/login',
          '/logout',
          '/refresh',
          '/token'
        ]
      });
    });
  });
  
describe('/api/auth/callback', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/callback');
    expect(response).toBeTruthy();
  });
});
  
describe('/api/auth/error', () => {
  it('should return the OpenAPI yaml spec', async () => {
    const response = await request(app).get('/api/auth/error');

    expect(response.statusCode).toBe(401);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({
      message: 'Error: Unable to authenticate'
    });
  });
});
  
describe('/api/auth/login', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/login');
    expect(response).toBeTruthy();
  });
});
  
describe('/api/auth/logout', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/logout');
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(302);
  });
});
  
describe('/api/auth/refresh', () => {
  it('should have a 200 response', async () => {
    auth.renew = jest.fn().mockResolvedValue({
      access_token: validToken,
      refresh_token: endlessToken
    });

    const response = await request(app)
      .post('/api/auth/refresh')
      .send({
        refreshToken: endlessToken
      });

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  it('should have a 400 response', async () => {
    const response = await request(app).post('/api/auth/refresh');
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
  });
});

describe('/api/auth/token', () => {
  it('should have a response', async () => {
    const response = await request(app).get('/api/auth/token');
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(401);
  });
});