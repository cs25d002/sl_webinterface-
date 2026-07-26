import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HospitalServicesPage } from '../pages/HospitalServices/HospitalServicesPage';
import * as hospitalsApi from '../api/hospitals';
import { getMockHospital } from './fixtures/hospitals';

function renderForHospital(hospitalSlug: string) {
  const hospital = getMockHospital(hospitalSlug);
  vi.spyOn(hospitalsApi, 'fetchHospitalServices').mockResolvedValue({
    hospital,
    services: hospital.services
  });

  return render(
    <MemoryRouter initialEntries={[`/services/${hospitalSlug}`]}>
      <Routes>
        <Route path="/services/:hospitalSlug" element={<HospitalServicesPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HospitalServicesPage', () => {
  let windowOpenSpy: MockInstance;
  const assignMock = vi.fn();
  const originalLocation = window.location;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    assignMock.mockClear();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, assign: assignMock }
    });
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation
    });
  });

  it('renders all three SVIMS service cards', async () => {
    renderForHospital('svims');

    expect(await screen.findByText('Annotation Tool')).toBeInTheDocument();
    expect(screen.getByText('Clinician Interface')).toBeInTheDocument();
    expect(screen.getByText('PII Masking')).toBeInTheDocument();
  });

  it('renders both Manipal service cards', async () => {
    renderForHospital('manipal-mangalore');

    expect(await screen.findByText('Annotation Tool')).toBeInTheDocument();
    expect(screen.getByText('Text Extraction from Patient Records')).toBeInTheDocument();
  });

  it('renders the single Chittoor service card', async () => {
    renderForHospital('chittoor-general-hospital');

    expect(await screen.findByText('Text Extraction from Discharge Summaries')).toBeInTheDocument();
  });

  it('disables the button and shows a configuration message for a placeholder URL', async () => {
    renderForHospital('svims');

    await screen.findByText('Annotation Tool');
    const buttons = screen.getAllByRole('button', { name: /deployment url not configured|open service/i });
    const placeholderButton = screen.getByRole('button', { name: /deployment url not configured/i });

    expect(placeholderButton).toBeDisabled();

    await userEvent.click(placeholderButton);
    expect(windowOpenSpy).not.toHaveBeenCalled();
    expect(assignMock).not.toHaveBeenCalled();
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens a new-tab service securely via window.open', async () => {
    renderForHospital('svims');

    await screen.findByText('Clinician Interface');
    const card = screen.getByText('Clinician Interface').closest('article');
    const openButton = card!.querySelector('button') as HTMLButtonElement;

    await userEvent.click(openButton);

    expect(windowOpenSpy).toHaveBeenCalledWith('https://svims-clinician.example.org', '_blank', 'noopener,noreferrer');
  });

  it('navigates a same-tab service via window.location.assign', async () => {
    renderForHospital('svims');

    await screen.findByText('PII Masking');
    const card = screen.getByText('PII Masking').closest('article');
    const openButton = card!.querySelector('button') as HTMLButtonElement;

    await userEvent.click(openButton);

    expect(assignMock).toHaveBeenCalledWith('https://svims-masking.example.org');
    expect(windowOpenSpy).not.toHaveBeenCalled();
  });

  it('falls back to the default icon for an unknown icon identifier', async () => {
    renderForHospital('manipal-mangalore');

    const card = (await screen.findByText('Annotation Tool')).closest('article');
    expect(card?.querySelector('svg')).toBeInTheDocument();
  });

  it('disables the button for a coming-soon service', async () => {
    renderForHospital('manipal-mangalore');

    await screen.findByText('Text Extraction from Patient Records');
    const card = screen.getByText('Text Extraction from Patient Records').closest('article');
    const button = card!.querySelector('button') as HTMLButtonElement;

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/coming soon/i);
  });
});
