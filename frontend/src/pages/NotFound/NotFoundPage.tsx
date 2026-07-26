import { CompassIcon } from 'lucide-react';
import { PrimaryButton } from '../../components/PrimaryButton';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="container not-found-page__inner">
        <div className="not-found-page__icon">
          <CompassIcon size={32} strokeWidth={1.5} />
        </div>
        <h1>404 — Page Not Found</h1>
        <p>The page you are looking for doesn&apos;t exist or may have been moved.</p>
        <PrimaryButton to="/">Return to Home</PrimaryButton>
      </div>
    </section>
  );
}
