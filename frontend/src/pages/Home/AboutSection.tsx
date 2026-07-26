import { aboutContent } from '../../data/about';
import { SectionHeading } from '../../components/SectionHeading';
import './AboutSection.css';

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container about-section">
        <SectionHeading eyebrow="About Us" title={aboutContent.heading} align="left" />
        <div className="about-section__paragraphs">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
