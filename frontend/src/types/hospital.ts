export type EntityStatus = 'active' | 'coming-soon' | 'inactive';
export type ServiceOpenMode = 'same-tab' | 'new-tab';

export interface HospitalLocation {
  city: string;
  state: string;
  country: string;
}

export interface HospitalService {
  id: string;
  name: string;
  slug: string;
  description: string;
  url: string;
  icon: string;
  openMode: ServiceOpenMode;
  status: EntityStatus;
}

export interface Hospital {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  location: HospitalLocation;
  description: string;
  officialWebsite: string | null;
  status: EntityStatus;
  services: HospitalService[];
}
