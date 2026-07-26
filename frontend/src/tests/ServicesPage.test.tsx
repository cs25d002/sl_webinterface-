import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ServicesPage } from '../pages/Services/ServicesPage';
import * as hospitalsApi from '../api/hospitals';
import { mockHospitals } from './fixtures/hospitals';

describe('ServicesPage', () => {
  it('renders all three hospital cards fetched from the backend', async () => {
    vi.spyOn(hospitalsApi, 'fetchHospitals').mockResolvedValue(mockHospitals);

    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('Sri Venkateswara Institute of Medical Sciences')).toBeInTheDocument();
    expect(screen.getByText('Manipal Hospitals, Mangalore')).toBeInTheDocument();
    expect(screen.getByText('Chittoor Government General Hospital')).toBeInTheDocument();
  });

  it('links "View Services" to the internal hospital services route', async () => {
    vi.spyOn(hospitalsApi, 'fetchHospitals').mockResolvedValue(mockHospitals);

    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    await screen.findByText('Sri Venkateswara Institute of Medical Sciences');

    const viewServicesLinks = screen.getAllByRole('link', { name: /view services/i });
    expect(viewServicesLinks[0]).toHaveAttribute('href', '/services/svims');
  });

  it('filters hospitals by search term', async () => {
    vi.spyOn(hospitalsApi, 'fetchHospitals').mockResolvedValue(mockHospitals);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    await screen.findByText('Sri Venkateswara Institute of Medical Sciences');

    await user.type(screen.getByLabelText(/search hospitals/i), 'mangalore');

    await waitFor(() => {
      expect(screen.queryByText('Sri Venkateswara Institute of Medical Sciences')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Manipal Hospitals, Mangalore')).toBeInTheDocument();
  });

  it('shows an empty state when no hospitals match the search', async () => {
    vi.spyOn(hospitalsApi, 'fetchHospitals').mockResolvedValue(mockHospitals);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    await screen.findByText('Sri Venkateswara Institute of Medical Sciences');
    await user.type(screen.getByLabelText(/search hospitals/i), 'no-such-hospital');

    expect(await screen.findByText(/no hospitals match your search/i)).toBeInTheDocument();
  });
});
