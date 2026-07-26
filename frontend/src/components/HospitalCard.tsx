import { ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Hospital } from '../types/hospital';
import './cards.css';
import './HospitalCard.css';

interface HospitalCardProps {
  hospital: Hospital;
}

const STATUS_LABELS: Record<Hospital['status'], string> = {
  active: 'Active',
  'coming-soon': 'Coming Soon',
  inactive: 'Inactive'
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  const isActive = hospital.status === 'active';
  const serviceCount = hospital.services.length;

  return (
    <article className="card hospital-card">
      <div className="hospital-card__header">
        <div>
          <h3 className="hospital-card__name">{hospital.name}</h3>
          <p className="hospital-card__short-name">{hospital.shortName}</p>
        </div>
        <span className={`badge ${isActive ? 'badge--active' : 'badge--coming-soon'}`}>
          {STATUS_LABELS[hospital.status]}
        </span>
      </div>
      <p className="hospital-card__city">
        <MapPin size={15} /> {hospital.location.city}, {hospital.location.state}
      </p>
      <p className="hospital-card__description">{hospital.description}</p>
      <p className="hospital-card__service-count">
        {serviceCount} {serviceCount === 1 ? 'service' : 'services'} available
      </p>

      {hospital.officialWebsite && (
        <a
          className="hospital-card__website-link"
          href={hospital.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} /> Official Website
        </a>
      )}

      {isActive ? (
        <Link to={`/services/${hospital.slug}`} className="btn btn--primary hospital-card__action">
          View Services
        </Link>
      ) : (
        <button type="button" className="btn btn--primary hospital-card__action" disabled>
          View Services
        </button>
      )}
    </article>
  );
}
