import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('GET /api/hospitals', () => {
  it('returns exactly the three configured hospitals', async () => {
    const response = await request(app).get('/api/hospitals');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    const slugs = response.body.data.map((hospital: { slug: string }) => hospital.slug);
    expect(slugs).toEqual(['svims', 'manipal-mangalore', 'chittoor-general-hospital']);
  });
});

describe('GET /api/hospitals/:hospitalSlug', () => {
  it('returns SVIMS with three services', async () => {
    const response = await request(app).get('/api/hospitals/svims');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.slug).toBe('svims');
    expect(response.body.data.services).toHaveLength(3);
  });

  it('returns Manipal with two services', async () => {
    const response = await request(app).get('/api/hospitals/manipal-mangalore');

    expect(response.status).toBe(200);
    expect(response.body.data.services).toHaveLength(2);
  });

  it('returns Chittoor with one service', async () => {
    const response = await request(app).get('/api/hospitals/chittoor-general-hospital');

    expect(response.status).toBe(200);
    expect(response.body.data.services).toHaveLength(1);
    expect(response.body.data.officialWebsite).toBeNull();
  });

  it('returns 404 for an unknown hospital slug', async () => {
    const response = await request(app).get('/api/hospitals/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('HOSPITAL_NOT_FOUND');
  });
});

describe('GET /api/hospitals/:hospitalSlug/services', () => {
  it('returns the hospital and its enabled services', async () => {
    const response = await request(app).get('/api/hospitals/svims/services');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.hospital.slug).toBe('svims');
    expect(response.body.data.services).toHaveLength(3);
  });

  it('returns 404 for an unknown hospital slug', async () => {
    const response = await request(app).get('/api/hospitals/does-not-exist/services');

    expect(response.status).toBe(404);
    expect(response.body.code).toBe('HOSPITAL_NOT_FOUND');
  });
});

describe('GET /api/hospitals/:hospitalSlug/services/:serviceSlug', () => {
  it('returns a matching service', async () => {
    const response = await request(app).get('/api/hospitals/svims/services/pii-masking');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.slug).toBe('pii-masking');
    expect(response.body.data.icon).toBe('shield-check');
  });

  it('returns 404 for an unknown service slug', async () => {
    const response = await request(app).get('/api/hospitals/svims/services/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('SERVICE_NOT_FOUND');
  });

  it('returns 404 for an unknown hospital slug', async () => {
    const response = await request(app).get('/api/hospitals/does-not-exist/services/pii-masking');

    expect(response.status).toBe(404);
    expect(response.body.code).toBe('HOSPITAL_NOT_FOUND');
  });
});
