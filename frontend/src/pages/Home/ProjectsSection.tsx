import { projects } from '../../data/projects';
import { SectionHeading } from '../../components/SectionHeading';
import { ProjectCard } from '../../components/ProjectCard';
import './ProjectsSection.css';

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="What We're Building"
          description="Initial projects underway or planned across digitization, document intelligence, and workflow tooling."
        />
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
