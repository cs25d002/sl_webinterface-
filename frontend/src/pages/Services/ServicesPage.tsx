import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchHospitals } from '../../api/hospitals';
import type { Hospital } from '../../types/hospital';
import { SectionHeading } from '../../components/SectionHeading';
import { HospitalCard } from '../../components/HospitalCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { ErrorAlert } from '../../components/ErrorAlert';
import './ServicesPage.css';

export function ServicesPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchHospitals()
      .then((data) => {
        if (isMounted) {
          setHospitals(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('We could not load hospital information right now. Please try again shortly.');
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
  }, []);

  const filteredHospitals = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return hospitals;
    }
    return hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query) || hospital.location.city.toLowerCase().includes(query)
    );
  }, [hospitals, searchTerm]);

  return (
    <section className="section services-page">
      <div className="container">
        <Link to="/" className="services-page__back">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <SectionHeading
          eyebrow="Services"
          title="Find Your Hospital"
          description="Select your hospital below to view its available Swasthyalekha services."
          align="left"
        />

        <label className="services-page__search" htmlFor="hospital-search">
          <Search size={18} />
          <input
            id="hospital-search"
            type="search"
            placeholder="Search by hospital name or city…"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search hospitals by name or city"
          />
        </label>

        {isLoading && <LoadingSpinner label="Loading hospitals…" />}

        {!isLoading && error && <ErrorAlert message={error} />}

        {!isLoading && !error && filteredHospitals.length === 0 && (
          <EmptyState
            title="No hospitals match your search"
            description="Try a different hospital name or city."
          />
        )}

        {!isLoading && !error && filteredHospitals.length > 0 && (
          <div className="services-page__grid">
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
