import hospitalsRegistryJson from '../config/hospitals.json';
import {
  validateHospitalRegistry,
  type Hospital,
  type HospitalRegistry,
  type HospitalService
} from '../types/hospital';

const PLACEHOLDER_URL_PATTERNS = [/replace-with-/i, /example\.com/i, /localhost-placeholder/i];

export function isPlaceholderUrl(url: string): boolean {
  return PLACEHOLDER_URL_PATTERNS.some((pattern) => pattern.test(url));
}

function serviceEnvVarName(hospitalSlug: string, serviceSlug: string): string {
  const normalize = (value: string) => value.toUpperCase().replace(/-/g, '_');
  return `SERVICE_URL_${normalize(hospitalSlug)}_${normalize(serviceSlug)}`;
}

function applyEnvironmentOverrides(registry: HospitalRegistry): HospitalRegistry {
  return {
    ...registry,
    hospitals: registry.hospitals.map((hospital) => ({
      ...hospital,
      services: hospital.services.map((service) => {
        const envVarName = serviceEnvVarName(hospital.slug, service.slug);
        const override = process.env[envVarName];
        return override ? { ...service, url: override } : service;
      })
    }))
  };
}

const registry: HospitalRegistry = applyEnvironmentOverrides(validateHospitalRegistry(hospitalsRegistryJson));

const PUBLIC_HOSPITAL_STATUSES = new Set(['active', 'coming-soon']);
const PUBLIC_SERVICE_STATUSES = new Set(['active', 'coming-soon']);

export function toPublicHospital(hospital: Hospital): Hospital {
  return {
    ...hospital,
    services: hospital.services.filter((service) => PUBLIC_SERVICE_STATUSES.has(service.status))
  };
}

export function getActiveHospitals(): Hospital[] {
  return registry.hospitals.filter((hospital) => PUBLIC_HOSPITAL_STATUSES.has(hospital.status)).map(toPublicHospital);
}

export function getHospitalBySlug(hospitalSlug: string): Hospital | undefined {
  const hospital = registry.hospitals.find(
    (candidate) => candidate.slug === hospitalSlug && PUBLIC_HOSPITAL_STATUSES.has(candidate.status)
  );
  return hospital ? toPublicHospital(hospital) : undefined;
}

export function getActiveServicesForHospital(hospitalSlug: string): HospitalService[] | undefined {
  const hospital = getHospitalBySlug(hospitalSlug);
  return hospital?.services;
}

export function getHospitalService(hospitalSlug: string, serviceSlug: string): HospitalService | undefined {
  const services = getActiveServicesForHospital(hospitalSlug);
  return services?.find((service) => service.slug === serviceSlug);
}
