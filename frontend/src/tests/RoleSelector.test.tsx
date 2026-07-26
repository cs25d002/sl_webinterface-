import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoleSelector } from '../components/RoleSelector';

describe('RoleSelector', () => {
  it('lets the user switch between administrator and user roles', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<RoleSelector role="admin" onChange={handleChange} />);

    expect(screen.getByRole('tab', { name: /login as administrator/i })).toHaveAttribute('aria-selected', 'true');

    await user.click(screen.getByRole('tab', { name: /login as user/i }));

    expect(handleChange).toHaveBeenCalledWith('user');
  });
});
