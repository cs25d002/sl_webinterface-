import { AlertTriangle } from 'lucide-react';
import './ErrorAlert.css';

interface ErrorAlertProps {
  message: string;
  tone?: 'error' | 'info';
}

export function ErrorAlert({ message, tone = 'error' }: ErrorAlertProps) {
  return (
    <div className={`error-alert error-alert--${tone}`} role="alert">
      <AlertTriangle size={18} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
