import kalidasPhoto from '../assets/kalidas.png';
import shilpaPhoto from '../assets/shilpa.jpg';

export interface Founder {
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  imagePlaceholder: string;
  linkedinPlaceholder: string;
  emailPlaceholder: string;
}

/**
 * PLACEHOLDER FOUNDER INFORMATION.
 * Roles and biographies below are illustrative placeholders only and must
 * be replaced with verified information before launch. Founder names and
 * photos (where available) are real.
 */
export const founders: Founder[] = [
  {
    name: 'Dr. Kalidas Yeturu',
    role: 'Co-Founder',
    bio: 'Biography placeholder. Replace with a short, verified biography for this founder.',
    photo: kalidasPhoto,
    imagePlaceholder: 'Profile photo coming soon',
    linkedinPlaceholder: 'https://linkedin.com/in/placeholder',
    emailPlaceholder: 'swasthyalekha@iittp.ac.in'
  },
  {
    name: 'Deepthi Lakshmi',
    role: 'Co-Founder',
    bio: 'Biography placeholder. Replace with a short, verified biography for this founder.',
    photo: null,
    imagePlaceholder: 'Profile photo coming soon',
    linkedinPlaceholder: 'https://linkedin.com/in/placeholder',
    emailPlaceholder: 'swasthyalekha@iittp.ac.in'
  },
  {
    name: 'Ch Sri Silpa Roy',
    role: 'Co-Founder',
    bio: 'Biography placeholder. Replace with a short, verified biography for this founder.',
    photo: shilpaPhoto,
    imagePlaceholder: 'Profile photo coming soon',
    linkedinPlaceholder: 'https://linkedin.com/in/placeholder',
    emailPlaceholder: 'swasthyalekha@iittp.ac.in'
  }
];
