import { describe, expect, it } from 'vitest';
import { isPlaceholderUrl, toPublicHospital } from '../services/hospitalRegistryService';
import type { Hospital } from '../types/hospital';

const hospitalWithMixedServices: Hospital = {
  id: 'hospital-test',
  name: 'Test Hospital',
  shortName: 'Test',
  slug: 'test-hospital',
  location: { city: 'City', state: 'State', country: 'Country' },
  description: 'A test hospital.',
  officialWebsite: null,
  status: 'active',
  services: [
    {
      id: 'svc-active',
      name: 'Active Service',
      slug: 'active-service',
      description: 'An active service.',
      url: 'https://active.example.org',
      icon: 'activity',
      openMode: 'new-tab',
      status: 'active'
    },
    {
      id: 'svc-coming-soon',
      name: 'Coming Soon Service',
      slug: 'coming-soon-service',
      description: 'A coming-soon service.',
      url: 'https://coming-soon.example.org',
      icon: 'activity',
      openMode: 'new-tab',
      status: 'coming-soon'
    },
    {
      id: 'svc-inactive',
      name: 'Inactive Service',
      slug: 'inactive-service',
      description: 'An inactive service.',
      url: 'https://inactive.example.org',
      icon: 'activity',
      openMode: 'new-tab',
      status: 'inactive'
    }
  ]
};

describe('toPublicHospital', () => {
  it('filters out inactive services while keeping active and coming-soon ones', () => {
    const publicHospital = toPublicHospital(hospitalWithMixedServices);

    const slugs = publicHospital.services.map((service) => service.slug);
    expect(slugs).toEqual(['active-service', 'coming-soon-service']);
    expect(slugs).not.toContain('inactive-service');
  });
});

describe('isPlaceholderUrl', () => {
  it('detects known placeholder URL patterns', () => {
    expect(isPlaceholderUrl('https://replace-with-svims-annotation-url.example.com')).toBe(true);
    expect(isPlaceholderUrl('https://example.com/anything')).toBe(true);
    expect(isPlaceholderUrl('https://localhost-placeholder/service')).toBe(true);
  });

  it('does not flag a real deployment URL as a placeholder', () => {
    expect(isPlaceholderUrl('https://svims-clinician.example.org')).toBe(false);
  });
});
