import { collaborationCategories } from '../../data/collaborations';
import { SectionHeading } from '../../components/SectionHeading';
import { CollaborationCard } from '../../components/CollaborationCard';
import './CollaborationsSection.css';

export function CollaborationsSection() {
  return (
    <section id="collaborations" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Collaborations"
          title="Who We Work With"
          description="Actual collaboration names will be added here as partnerships are finalized."
        />
        <div className="collaborations-grid">
          {collaborationCategories.map((category) => (
            <CollaborationCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
