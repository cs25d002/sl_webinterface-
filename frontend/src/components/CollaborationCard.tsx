import { Handshake } from 'lucide-react';
import type { CollaborationCategory } from '../data/collaborations';
import './cards.css';
import './CollaborationCard.css';

interface CollaborationCardProps {
  category: CollaborationCategory;
}

export function CollaborationCard({ category }: CollaborationCardProps) {
  return (
    <article className="card collaboration-card">
      <div className="collaboration-card__icon">
        <Handshake size={22} strokeWidth={1.5} />
      </div>
      <h3 className="collaboration-card__title">{category.title}</h3>
      <p className="collaboration-card__description">{category.description}</p>
    </article>
  );
}
