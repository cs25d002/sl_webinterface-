import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchHospitalBySlug } from '../../api/hospitals';
import type { Hospital } from '../../types/hospital';
import type { LoginRole } from '../../types/auth';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorAlert } from '../../components/ErrorAlert';
import { RoleSelector } from '../../components/RoleSelector';
import { LoginForm } from '../../components/LoginForm';
import './HospitalLoginPage.css';

export function HospitalLoginPage() {
  const { hospitalSlug = '' } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<LoginRole>('admin');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetchHospitalBySlug(hospitalSlug)
      .then((data) => {
        if (isMounted) {
          setHospital(data);
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
    <section className="section hospital-login-page">
      <div className="container hospital-login-page__container">
        <button type="button" className="hospital-login-page__back" onClick={() => navigate('/services')}>
          <ArrowLeft size={16} /> Back to Hospital Selection
        </button>

        {isLoading && <LoadingSpinner label="Loading hospital details…" />}

        {!isLoading && error && (
          <>
            <ErrorAlert message={error} />
            <Link to="/services" className="hospital-login-page__link">
              Choose a different hospital
            </Link>
          </>
        )}

        {!isLoading && !error && hospital && (
          <div className="hospital-login-page__card">
            <p className="hospital-login-page__hospital-label">Signing in to</p>
            <h1 className="hospital-login-page__hospital-name">{hospital.name}</h1>
            <p className="hospital-login-page__hospital-city">
              {hospital.location.city}, {hospital.location.state}
            </p>

            <RoleSelector role={role} onChange={setRole} />
            <LoginForm hospitalSlug={hospital.slug} role={role} />
          </div>
        )}
      </div>
    </section>
  );
}
