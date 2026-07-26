import type { Hospital } from '../types/hospital';

/**
 * DEMONSTRATION DATA ONLY.
 * These hospitals are placeholders for the first development phase.
 * This in-memory array is intentionally shaped like a future database
 * table so `hospital.service.ts` can be swapped for a real persistence
 * layer without changing its public function signatures.
 */
export const demoHospitals: Hospital[] = [
  {
    id: 'hosp-001',
    name: 'Swasthyalekha Demo Hospital',
    slug: 'swasthyalekha-demo-hospital',
    city: 'Chennai',
    description:
      'The reference demonstration hospital used to showcase Swasthyalekha digitization and workflow tools.',
    services: ['Clinical Record Digitization', 'Handwritten Text Processing', 'Hospital Workflow Integration'],
    status: 'active'
  },
  {
    id: 'hosp-002',
    name: 'City Care Hospital',
    slug: 'city-care-hospital',
    city: 'Bengaluru',
    description: 'A placeholder multi-specialty hospital used for prototype login and services flows.',
    services: ['Clinical Record Digitization', 'Medical Document Annotation'],
    status: 'active'
  },
  {
    id: 'hosp-003',
    name: 'Sunrise Multispeciality Hospital',
    slug: 'sunrise-multispeciality-hospital',
    city: 'Hyderabad',
    description: 'Placeholder hospital demonstrating the hospital selection and search experience.',
    services: ['Healthcare Data Organization', 'Privacy and Sensitive Data Protection'],
    status: 'active'
  },
  {
    id: 'hosp-004',
    name: 'Green Valley Medical Centre',
    slug: 'green-valley-medical-centre',
    city: 'Pune',
    description: 'Placeholder hospital shown in a coming-soon state to demonstrate status badges.',
    services: ['Clinical Record Digitization'],
    status: 'coming-soon'
  }
];
