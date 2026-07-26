import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { FoundersSection } from './FoundersSection';
import { ProjectsSection } from './ProjectsSection';
import { CollaborationsSection } from './CollaborationsSection';
import { ServicesPreviewSection } from './ServicesPreviewSection';
import { ValuesSection } from './ValuesSection';
import { ContactSection } from './ContactSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FoundersSection />
      <ProjectsSection />
      <CollaborationsSection />
      <ServicesPreviewSection />
      <ValuesSection />
      <ContactSection />
    </>
  );
}
