import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('GET /api/hospitals', () => {
  it('returns the demonstration hospital list', async () => {
    const response = await request(app).get('/api/hospitals');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('slug');
  });
});

describe('GET /api/hospitals/:slug', () => {
  it('returns a matching hospital', async () => {
    const response = await request(app).get('/api/hospitals/swasthyalekha-demo-hospital');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.slug).toBe('swasthyalekha-demo-hospital');
  });

  it('returns 404 for an unknown slug', async () => {
    const response = await request(app).get('/api/hospitals/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('HOSPITAL_NOT_FOUND');
  });
});
