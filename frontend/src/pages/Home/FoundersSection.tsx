import { founders } from '../../data/founders';
import { SectionHeading } from '../../components/SectionHeading';
import { FounderCard } from '../../components/FounderCard';
import './FoundersSection.css';

export function FoundersSection() {
  return (
    <section id="founders" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Founders"
          title="Meet the Founders"
          description="Placeholder founder profiles — to be replaced with verified information."
        />
        <div className="founders-grid">
          {founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </div>
    </section>
  );
}
