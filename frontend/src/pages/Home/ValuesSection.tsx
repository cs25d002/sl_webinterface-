import { companyValues } from '../../data/values';
import { SectionHeading } from '../../components/SectionHeading';
import './ValuesSection.css';

export function ValuesSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Our Values" title="What Guides Our Work" />
        <div className="values-grid">
          {companyValues.map((value) => (
            <div className="values-grid__item" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
