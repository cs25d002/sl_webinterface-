import type { ReactNode } from 'react';
import type { ServiceItem } from '../data/services';
import './cards.css';
import './ServiceCard.css';

interface ServiceCardProps {
  service: ServiceItem;
  icon: ReactNode;
}

export function ServiceCard({ service, icon }: ServiceCardProps) {
  return (
    <article className="card service-card">
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>
    </article>
  );
}
