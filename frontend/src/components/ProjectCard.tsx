import type { Project } from '../data/projects';
import './cards.css';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card project-card">
      <div className="project-card__top">
        <span className="badge badge--status">{project.category}</span>
        <span className="badge badge--active">{project.status}</span>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <button type="button" className="project-card__learn-more" title="Details coming soon">
        Learn More
      </button>
    </article>
  );
}
