export type HospitalStatus = 'active' | 'coming-soon';

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  city: string;
  description: string;
  services: string[];
  status: HospitalStatus;
}
