import { ShieldCheck, UserRound } from 'lucide-react';
import type { LoginRole } from '../types/auth';
import './RoleSelector.css';

interface RoleSelectorProps {
  role: LoginRole;
  onChange: (role: LoginRole) => void;
}

export function RoleSelector({ role, onChange }: RoleSelectorProps) {
  return (
    <div className="role-selector" role="tablist" aria-label="Select login role">
      <button
        type="button"
        role="tab"
        aria-selected={role === 'admin'}
        className={`role-selector__option ${role === 'admin' ? 'role-selector__option--active' : ''}`}
        onClick={() => onChange('admin')}
      >
        <ShieldCheck size={18} />
        Login as Administrator
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={role === 'user'}
        className={`role-selector__option ${role === 'user' ? 'role-selector__option--active' : ''}`}
        onClick={() => onChange('user')}
      >
        <UserRound size={18} />
        Login as User
      </button>
    </div>
  );
}
