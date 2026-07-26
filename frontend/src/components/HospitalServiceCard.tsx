import type { HospitalService } from '../types/hospital';
import { getServiceIcon } from './icons/serviceIconRegistry';
import { getServiceDisabledReason, getServiceHostname, isServiceActionable, openService } from '../utils/serviceNavigation';
import './cards.css';
import './HospitalServiceCard.css';

interface HospitalServiceCardProps {
  service: HospitalService;
}

const STATUS_LABELS: Record<HospitalService['status'], string> = {
  active: 'Active',
  'coming-soon': 'Coming Soon',
  inactive: 'Inactive'
};

export function HospitalServiceCard({ service }: HospitalServiceCardProps) {
  const Icon = getServiceIcon(service.icon);
  const actionable = isServiceActionable(service);
  const disabledReason = getServiceDisabledReason(service);

  return (
    <article className="card hospital-service-card">
      <div className="hospital-service-card__top">
        <div className="hospital-service-card__icon">
          <Icon size={22} />
        </div>
        <span className={`badge ${service.status === 'active' ? 'badge--active' : 'badge--coming-soon'}`}>
          {STATUS_LABELS[service.status]}
        </span>
      </div>
      <h3 className="hospital-service-card__name">{service.name}</h3>
      <p className="hospital-service-card__description">{service.description}</p>
      <p className="hospital-service-card__hostname">{getServiceHostname(service.url)}</p>

      <button
        type="button"
        className="btn btn--primary hospital-service-card__action"
        disabled={!actionable}
        title={disabledReason ?? undefined}
        onClick={() => openService(service)}
      >
        {disabledReason ?? 'Open Service'}
      </button>
    </article>
  );
}
