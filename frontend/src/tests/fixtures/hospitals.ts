import type { Hospital, HospitalService } from '../../types/hospital';

const svimsServices: HospitalService[] = [
  {
    id: 'svims-annotation-tool',
    name: 'Annotation Tool',
    slug: 'annotation-tool',
    description: 'Clinical document annotation and expert validation interface.',
    url: 'https://replace-with-svims-annotation-url.example.com',
    icon: 'file-pen-line',
    openMode: 'new-tab',
    status: 'active'
  },
  {
    id: 'svims-clinician-interface',
    name: 'Clinician Interface',
    slug: 'clinician-interface',
    description: 'Interface for clinicians to review and interact with clinical information.',
    url: 'https://svims-clinician.example.org',
    icon: 'stethoscope',
    openMode: 'new-tab',
    status: 'active'
  },
  {
    id: 'svims-pii-masking',
    name: 'PII Masking',
    slug: 'pii-masking',
    description: 'Privacy-aware masking of personally identifiable information in clinical documents.',
    url: 'https://svims-masking.example.org',
    icon: 'shield-check',
    openMode: 'same-tab',
    status: 'active'
  }
];

const manipalServices: HospitalService[] = [
  {
    id: 'manipal-annotation-tool',
    name: 'Annotation Tool',
    slug: 'annotation-tool',
    description: 'Clinical record annotation and expert correction interface.',
    url: 'https://manipal-annotation.example.org',
    icon: 'unknown-icon-id',
    openMode: 'new-tab',
    status: 'active'
  },
  {
    id: 'manipal-patient-record-extraction',
    name: 'Text Extraction from Patient Records',
    slug: 'patient-record-text-extraction',
    description: 'Extraction of structured text from scanned patient records.',
    url: 'https://manipal-extraction.example.org',
    icon: 'scan-text',
    openMode: 'new-tab',
    status: 'coming-soon'
  }
];

const chittoorServices: HospitalService[] = [
  {
    id: 'chittoor-discharge-summary-extraction',
    name: 'Text Extraction from Discharge Summaries',
    slug: 'discharge-summary-text-extraction',
    description: 'Extraction of text and structured information from scanned discharge summaries.',
    url: 'https://chittoor-extraction.example.org',
    icon: 'file-text',
    openMode: 'new-tab',
    status: 'active'
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hospital-svims',
    name: 'Sri Venkateswara Institute of Medical Sciences',
    shortName: 'SVIMS',
    slug: 'svims',
    location: { city: 'Tirupati', state: 'Andhra Pradesh', country: 'India' },
    description: 'Healthcare technology services configured for SVIMS.',
    officialWebsite: 'https://svimstpt.ap.nic.in/',
    status: 'active',
    services: svimsServices
  },
  {
    id: 'hospital-manipal-mangalore',
    name: 'Manipal Hospitals, Mangalore',
    shortName: 'Manipal',
    slug: 'manipal-mangalore',
    location: { city: 'Mangalore', state: 'Karnataka', country: 'India' },
    description: 'Document annotation and patient-record text extraction services.',
    officialWebsite: 'https://www.manipalhospitals.com/mangalore/specialities/dental-medicine/',
    status: 'active',
    services: manipalServices
  },
  {
    id: 'hospital-chittoor-general',
    name: 'Chittoor Government General Hospital',
    shortName: 'Chittoor GGH',
    slug: 'chittoor-general-hospital',
    location: { city: 'Chittoor', state: 'Andhra Pradesh', country: 'India' },
    description: 'Clinical discharge-summary text extraction service.',
    officialWebsite: null,
    status: 'active',
    services: chittoorServices
  }
];

export function getMockHospital(slug: string): Hospital {
  const hospital = mockHospitals.find((candidate) => candidate.slug === slug);
  if (!hospital) {
    throw new Error(`No mock hospital fixture for slug "${slug}"`);
  }
  return hospital;
}
