import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';

describe('HomePage', () => {
  it('renders the hero heading and key sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /transforming healthcare records into intelligent digital systems/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore our services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('heading', { name: /meet the founders/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what we're building/i })).toBeInTheDocument();
  });
});
