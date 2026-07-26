export interface CollaborationCategory {
  title: string;
  description: string;
}

/**
 * NOTE: Actual collaboration names, logos, and institutional partners
 * will be added once agreements are finalized. The categories below
 * are neutral placeholders describing the types of collaboration
 * Swasthyalekha intends to pursue.
 */
export const collaborationCategories: CollaborationCategory[] = [
  {
    title: 'Hospitals',
    description: 'Partner hospitals will be listed here as collaborations are finalized.'
  },
  {
    title: 'Academic Institutions',
    description: 'Academic and research partnerships will be listed here as they are established.'
  },
  {
    title: 'Healthcare Professionals',
    description: 'Clinicians and healthcare professionals advising on our work will be recognized here.'
  },
  {
    title: 'Research Laboratories',
    description: 'Research lab collaborations will be listed here once confirmed.'
  },
  {
    title: 'Technology Partners',
    description: 'Technology and infrastructure partners will be listed here as they are onboarded.'
  }
];
