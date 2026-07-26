import { useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginRequest } from '../api/auth';
import type { LoginRole } from '../types/auth';
import { ErrorAlert } from './ErrorAlert';
import './LoginForm.css';

interface LoginFormProps {
  hospitalSlug: string;
  role: LoginRole;
}

interface FieldErrors {
  identifier?: string;
  password?: string;
}

export function LoginForm({ hospitalSlug, role }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitMessage, setSubmitMessage] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleLabel = role === 'admin' ? 'Administrator Login' : 'User Login';

  function validate(): boolean {
    const errors: FieldErrors = {};

    if (!identifier.trim()) {
      errors.identifier = 'Email or username is required.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must contain at least six characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginRequest({ hospitalSlug, role, identifier, password });
      setSubmitMessage({ tone: 'info', text: response.message });
    } catch {
      setSubmitMessage({
        tone: 'error',
        text: 'Unable to reach the server right now. Please try again shortly.'
      });
    } finally {
      setPassword('');
      setIsSubmitting(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h2 className="login-form__title">{roleLabel}</h2>

      {submitMessage && <ErrorAlert message={submitMessage.text} tone={submitMessage.tone} />}

      <div className="login-form__field">
        <label htmlFor="identifier">Email or Username</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          aria-invalid={Boolean(fieldErrors.identifier)}
          aria-describedby={fieldErrors.identifier ? 'identifier-error' : undefined}
        />
        {fieldErrors.identifier && (
          <span className="login-form__field-error" id="identifier-error">
            {fieldErrors.identifier}
          </span>
        )}
      </div>

      <div className="login-form__field">
        <label htmlFor="password">Password</label>
        <div className="login-form__password-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="login-form__toggle-password"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {fieldErrors.password && (
          <span className="login-form__field-error" id="password-error">
            {fieldErrors.password}
          </span>
        )}
      </div>

      <label className="login-form__remember">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember me
      </label>

      <button type="submit" className="btn btn--primary login-form__submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Login'}
      </button>
    </form>
  );
}
