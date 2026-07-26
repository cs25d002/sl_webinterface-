import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { fetchHospitalServices } from '../../api/hospitals';
import type { Hospital, HospitalService } from '../../types/hospital';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorAlert } from '../../components/ErrorAlert';
import { EmptyState } from '../../components/EmptyState';
import { HospitalServiceCard } from '../../components/HospitalServiceCard';
import './HospitalServicesPage.css';

export function HospitalServicesPage() {
  const { hospitalSlug = '' } = useParams();

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [services, setServices] = useState<HospitalService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchHospitalServices(hospitalSlug)
      .then((payload) => {
        if (isMounted) {
          setHospital(payload.hospital);
          setServices(payload.services);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('This hospital could not be found. It may have been removed or renamed.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hospitalSlug]);

  return (
    <section className="section hospital-services-page">
      <div className="container">
        <nav className="hospital-services-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span>{hospital ? hospital.shortName : hospitalSlug}</span>
        </nav>

        <Link to="/services" className="hospital-services-page__back">
          <ArrowLeft size={16} /> Back to Hospitals
        </Link>

        {isLoading && <LoadingSpinner label="Loading services…" />}

        {!isLoading && error && <ErrorAlert message={error} />}

        {!isLoading && !error && hospital && (
          <>
            <div className="hospital-services-page__header">
              <h1 className="hospital-services-page__name">{hospital.name}</h1>
              <p className="hospital-services-page__short-name">{hospital.shortName}</p>
              <p className="hospital-services-page__location">
                <MapPin size={15} /> {hospital.location.city}, {hospital.location.state}
              </p>
              <p className="hospital-services-page__description">{hospital.description}</p>
              {hospital.officialWebsite && (
                <a
                  className="hospital-services-page__website-link"
                  href={hospital.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} /> Official Website
                </a>
              )}
            </div>

            {services.length === 0 ? (
              <EmptyState
                title="No services are available yet"
                description="Services for this hospital will appear here once configured."
              />
            ) : (
              <div className="hospital-services-page__grid">
                {services.map((service) => (
                  <HospitalServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
