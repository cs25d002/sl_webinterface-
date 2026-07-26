import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { ServicesPage } from '../pages/Services/ServicesPage';
import { HospitalServicesPage } from '../pages/HospitalServices/HospitalServicesPage';
import { HospitalLoginPage } from '../pages/HospitalLogin/HospitalLoginPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:hospitalSlug" element={<HospitalServicesPage />} />
      <Route path="/services/:hospitalSlug/login" element={<HospitalLoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
