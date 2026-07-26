import { z } from 'zod';

export const entityStatusSchema = z.enum(['active', 'coming-soon', 'inactive']);
export type EntityStatus = z.infer<typeof entityStatusSchema>;

export const serviceOpenModeSchema = z.enum(['same-tab', 'new-tab']);
export type ServiceOpenMode = z.infer<typeof serviceOpenModeSchema>;

const slugSchema = z
  .string()
  .min(1, 'Slug is required.')
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric segments separated by hyphens.');

const httpUrlSchema = z
  .string()
  .min(1, 'URL is required.')
  .url('Must be a valid URL.')
  .refine((value) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }, 'URL protocol must be http or https.');

export const hospitalLocationSchema = z.object({
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State is required.'),
  country: z.string().min(1, 'Country is required.')
});

export type HospitalLocation = z.infer<typeof hospitalLocationSchema>;

export const hospitalServiceSchema = z.object({
  id: z.string().min(1, 'Service id is required.'),
  name: z.string().min(1, 'Service name is required.'),
  slug: slugSchema,
  description: z.string().min(1, 'Service description is required.'),
  url: httpUrlSchema,
  icon: z.string().min(1, 'Service icon is required.'),
  openMode: serviceOpenModeSchema,
  status: entityStatusSchema
});

export type HospitalService = z.infer<typeof hospitalServiceSchema>;

export const hospitalSchema = z.object({
  id: z.string().min(1, 'Hospital id is required.'),
  name: z.string().min(1, 'Hospital name is required.'),
  shortName: z.string().min(1, 'Hospital short name is required.'),
  slug: slugSchema,
  location: hospitalLocationSchema,
  description: z.string().min(1, 'Hospital description is required.'),
  officialWebsite: httpUrlSchema.nullable(),
  status: entityStatusSchema,
  services: z.array(hospitalServiceSchema, { invalid_type_error: '"services" must be an array.' })
});

export type Hospital = z.infer<typeof hospitalSchema>;

export const hospitalRegistrySchema = z.object({
  version: z.number(),
  hospitals: z.array(hospitalSchema)
});

export type HospitalRegistry = z.infer<typeof hospitalRegistrySchema>;

export interface HospitalConfigError {
  message: string;
}

export class HospitalRegistryValidationError extends Error {}

export function validateHospitalRegistry(raw: unknown): HospitalRegistry {
  const result = hospitalRegistrySchema.safeParse(raw);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ');
    throw new HospitalRegistryValidationError(`Invalid hospital registry configuration — ${details}`);
  }

  const registry = result.data;

  const hospitalIds = new Set<string>();
  const hospitalSlugs = new Set<string>();
  const serviceIds = new Set<string>();

  for (const hospital of registry.hospitals) {
    if (hospitalIds.has(hospital.id)) {
      throw new HospitalRegistryValidationError(`Duplicate hospital id detected: "${hospital.id}".`);
    }
    hospitalIds.add(hospital.id);

    if (hospitalSlugs.has(hospital.slug)) {
      throw new HospitalRegistryValidationError(`Duplicate hospital slug detected: "${hospital.slug}".`);
    }
    hospitalSlugs.add(hospital.slug);

    const serviceSlugsForHospital = new Set<string>();
    for (const service of hospital.services) {
      if (serviceIds.has(service.id)) {
        throw new HospitalRegistryValidationError(`Duplicate service id detected: "${service.id}".`);
      }
      serviceIds.add(service.id);

      if (serviceSlugsForHospital.has(service.slug)) {
        throw new HospitalRegistryValidationError(
          `Duplicate service slug "${service.slug}" within hospital "${hospital.slug}".`
        );
      }
      serviceSlugsForHospital.add(service.slug);
    }
  }

  return registry;
}
