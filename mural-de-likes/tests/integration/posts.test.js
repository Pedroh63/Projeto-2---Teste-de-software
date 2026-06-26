const request = require('supertest');
const app = require('../../src/app');
const session = require('supertest-session');

describe('Rotas dos posts', () => {
  let testSession;

  beforeEach(() => {
    testSession = session(app);
  });

  test('Deve redirecionar para login os usuários não autenticados', async () => {
    const res = await request(app).get('/feed');
    expect(res.statusCode).toBe(302);
  });

  // More tests would require mock session
});