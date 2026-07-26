export interface ServiceItem {
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    title: 'Clinical Record Digitization',
    description: 'Turning paper-based clinical records into structured, accessible digital records.'
  },
  {
    title: 'Handwritten Text Processing',
    description: 'Processing handwritten clinical notes into usable digital text.'
  },
  {
    title: 'Medical Document Annotation',
    description: 'Structured annotation workflows for medical documents and records.'
  },
  {
    title: 'Privacy and Sensitive Data Protection',
    description: 'Handling sensitive health information with privacy-aware system design.'
  },
  {
    title: 'Hospital Workflow Integration',
    description: 'Integrating digitization tools into existing hospital administrative workflows.'
  },
  {
    title: 'Healthcare Data Organization',
    description: 'Organizing clinical data for reliable retrieval and downstream use.'
  }
];
