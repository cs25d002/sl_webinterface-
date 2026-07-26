import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './buttons.css';

interface CommonProps {
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

interface LinkProps extends CommonProps {
  to: string;
}

export function SecondaryButton(props: ButtonProps | LinkProps) {
  if ('to' in props && props.to) {
    const { to, children, className } = props;
    return (
      <Link to={to} className={`btn btn--secondary ${className ?? ''}`.trim()}>
        {children}
      </Link>
    );
  }

  const { children, className, ...rest } = props as ButtonProps;
  return (
    <button className={`btn btn--secondary ${className ?? ''}`.trim()} {...rest}>
      {children}
    </button>
  );
}
