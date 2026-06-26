import { describe, test, expect, beforeEach } from 'vitest';
const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database/db');

describe('Rotas auth', () => {
  beforeEach(() => {
  });

  test('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(302);
  });

  test('Deve fazer login do usuário', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(302);
  });
});