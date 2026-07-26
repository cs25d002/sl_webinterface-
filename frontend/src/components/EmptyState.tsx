import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon">{icon ?? <SearchX size={26} strokeWidth={1.5} />}</div>
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__description">{description}</p>}
    </div>
  );
}
