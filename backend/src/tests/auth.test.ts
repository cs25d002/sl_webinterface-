import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('POST /api/auth/login', () => {
  it('returns the authentication-not-configured response for valid input', async () => {
    const response = await request(app).post('/api/auth/login').send({
      hospitalSlug: 'swasthyalekha-demo-hospital',
      role: 'admin',
      identifier: 'admin@example.com',
      password: 'secret123'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: false,
      code: 'AUTHENTICATION_NOT_CONFIGURED',
      message: 'Authentication will be enabled in the next development phase.'
    });
  });

  it('rejects an invalid role', async () => {
    const response = await request(app).post('/api/auth/login').send({
      hospitalSlug: 'swasthyalekha-demo-hospital',
      role: 'superadmin',
      identifier: 'admin@example.com',
      password: 'secret123'
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('VALIDATION_ERROR');
  });

  it('rejects a missing password', async () => {
    const response = await request(app).post('/api/auth/login').send({
      hospitalSlug: 'swasthyalekha-demo-hospital',
      role: 'user',
      identifier: 'user@example.com',
      password: '123'
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('VALIDATION_ERROR');
  });
});
