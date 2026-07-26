export type ProjectStatus = 'In Progress' | 'Planned' | 'Exploratory';

export interface Project {
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    title: 'Clinical Document Digitization',
    description: 'Converting paper-based clinical records into structured, searchable digital formats.',
    category: 'Digitization',
    status: 'In Progress'
  },
  {
    title: 'Handwritten Medical Record Processing',
    description: 'Applying document-processing techniques to interpret handwritten clinical notes.',
    category: 'Document Intelligence',
    status: 'In Progress'
  },
  {
    title: 'Privacy-Aware Health Information Systems',
    description: 'Designing systems that handle sensitive health data with privacy as a core requirement.',
    category: 'Privacy & Security',
    status: 'Planned'
  },
  {
    title: 'Intelligent Hospital Workflow Tools',
    description: 'Building tools that streamline day-to-day administrative and clinical workflows.',
    category: 'Workflow',
    status: 'Planned'
  },
  {
    title: 'Medical Document Annotation Platform',
    description: 'A platform for structured annotation and review of medical documents.',
    category: 'Document Intelligence',
    status: 'Exploratory'
  },
  {
    title: 'Healthcare Data Search and Retrieval',
    description: 'Enabling fast, accurate retrieval of relevant information across clinical records.',
    category: 'Data Systems',
    status: 'Exploratory'
  }
];
