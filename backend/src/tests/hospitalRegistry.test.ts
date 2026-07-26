import { describe, expect, it } from 'vitest';
import { HospitalRegistryValidationError, validateHospitalRegistry } from '../types/hospital';

function baseService(overrides: Record<string, unknown> = {}) {
  return {
    id: 'svc-1',
    name: 'Sample Service',
    slug: 'sample-service',
    description: 'A sample service.',
    url: 'https://sample-service.example.org',
    icon: 'activity',
    openMode: 'new-tab',
    status: 'active',
    ...overrides
  };
}

function baseHospital(overrides: Record<string, unknown> = {}) {
  return {
    id: 'hospital-1',
    name: 'Sample Hospital',
    shortName: 'Sample',
    slug: 'sample-hospital',
    location: { city: 'City', state: 'State', country: 'Country' },
    description: 'A sample hospital.',
    officialWebsite: null,
    status: 'active',
    services: [baseService()],
    ...overrides
  };
}

describe('validateHospitalRegistry', () => {
  it('accepts a well-formed registry', () => {
    const registry = validateHospitalRegistry({ version: 1, hospitals: [baseHospital()] });
    expect(registry.hospitals).toHaveLength(1);
  });

  it('rejects a duplicate hospital slug', () => {
    const registry = {
      version: 1,
      hospitals: [
        baseHospital({ id: 'hospital-1' }),
        baseHospital({ id: 'hospital-2', slug: 'sample-hospital' })
      ]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(HospitalRegistryValidationError);
    expect(() => validateHospitalRegistry(registry)).toThrow(/duplicate hospital slug/i);
  });

  it('rejects a duplicate hospital id', () => {
    const registry = {
      version: 1,
      hospitals: [
        baseHospital({ id: 'hospital-1', slug: 'hospital-one' }),
        baseHospital({ id: 'hospital-1', slug: 'hospital-two' })
      ]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(/duplicate hospital id/i);
  });

  it('rejects a duplicate service id', () => {
    const registry = {
      version: 1,
      hospitals: [
        baseHospital({
          services: [baseService({ id: 'svc-1' }), baseService({ id: 'svc-1', slug: 'sample-service-two' })]
        })
      ]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(/duplicate service id/i);
  });

  it('rejects a missing required field', () => {
    const hospital = baseHospital();
    delete (hospital as Record<string, unknown>).name;

    expect(() => validateHospitalRegistry({ version: 1, hospitals: [hospital] })).toThrow(
      HospitalRegistryValidationError
    );
  });

  it('rejects an invalid service URL', () => {
    const registry = {
      version: 1,
      hospitals: [baseHospital({ services: [baseService({ url: 'not-a-url' })] })]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(HospitalRegistryValidationError);
  });

  it('rejects an unsafe URL protocol', () => {
    const registry = {
      version: 1,
      hospitals: [baseHospital({ services: [baseService({ url: 'javascript:alert(1)' })] })]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(HospitalRegistryValidationError);
  });

  it('rejects a slug with invalid characters', () => {
    const registry = {
      version: 1,
      hospitals: [baseHospital({ slug: 'Invalid Slug!' })]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(HospitalRegistryValidationError);
  });

  it('rejects services that are not an array', () => {
    const registry = {
      version: 1,
      hospitals: [baseHospital({ services: 'not-an-array' })]
    };

    expect(() => validateHospitalRegistry(registry)).toThrow(HospitalRegistryValidationError);
  });
});
