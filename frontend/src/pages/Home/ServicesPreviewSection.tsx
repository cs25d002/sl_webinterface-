import { FileText, PenTool, ScanText, ShieldCheck, Workflow, Database } from 'lucide-react';
import { services } from '../../data/services';
import { SectionHeading } from '../../components/SectionHeading';
import { ServiceCard } from '../../components/ServiceCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import './ServicesPreviewSection.css';

const icons = [FileText, ScanText, PenTool, ShieldCheck, Workflow, Database];

export function ServicesPreviewSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="How We Help Hospitals"
          description="A snapshot of the services Swasthyalekha offers to healthcare institutions."
        />
        <div className="services-preview-grid">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return <ServiceCard key={service.title} service={service} icon={<Icon size={22} />} />;
          })}
        </div>
        <div className="services-preview-cta">
          <PrimaryButton to="/services">View All Services</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
