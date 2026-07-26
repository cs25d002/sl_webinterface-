import { Linkedin, Mail, UserRound } from 'lucide-react';
import type { Founder } from '../data/founders';
import './cards.css';
import './FounderCard.css';

interface FounderCardProps {
  founder: Founder;
}

export function FounderCard({ founder }: FounderCardProps) {
  return (
    <article className="card founder-card">
      {founder.photo ? (
        <img src={founder.photo} alt={founder.name} className="founder-card__photo" />
      ) : (
        <div className="founder-card__avatar" role="img" aria-label={founder.imagePlaceholder}>
          <UserRound size={36} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="founder-card__name">{founder.name}</h3>
      <p className="founder-card__role">{founder.role}</p>
      <p className="founder-card__bio">{founder.bio}</p>
      <div className="founder-card__links">
        <a href={founder.linkedinPlaceholder} className="founder-card__link" aria-label={`${founder.name} on LinkedIn (placeholder)`}>
          <Linkedin size={16} /> LinkedIn
        </a>
        <a href={`mailto:${founder.emailPlaceholder}`} className="founder-card__link" aria-label={`Email ${founder.name} (placeholder)`}>
          <Mail size={16} /> Email
        </a>
      </div>
    </article>
  );
}
