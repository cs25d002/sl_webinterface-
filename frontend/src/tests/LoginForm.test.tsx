import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';
import * as authApi from '../api/auth';

describe('LoginForm', () => {
  it('shows validation errors for empty fields and a short password', async () => {
    const user = userEvent.setup();
    const loginSpy = vi.spyOn(authApi, 'loginRequest');

    render(<LoginForm hospitalSlug="swasthyalekha-demo-hospital" role="admin" />);

    await user.type(screen.getByLabelText(/email or username/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/^password$/i), '123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/password must contain at least six characters/i)).toBeInTheDocument();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('calls the login API and displays the prototype response on valid submission', async () => {
    const user = userEvent.setup();
    vi.spyOn(authApi, 'loginRequest').mockResolvedValue({
      success: false,
      code: 'AUTHENTICATION_NOT_CONFIGURED',
      message: 'Authentication will be enabled in the next development phase.'
    });

    render(<LoginForm hospitalSlug="swasthyalekha-demo-hospital" role="user" />);

    await user.type(screen.getByLabelText(/email or username/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/authentication will be enabled in the next development phase/i)).toBeInTheDocument();
    });
  });
});
