export interface NavLink {
  label: string;
  href: string;
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Founders', href: '/#founders' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Collaborations', href: '/#collaborations' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/#contact' }
];
