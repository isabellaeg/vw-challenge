import React from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps {
  children?: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  'aria-label'?: string;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'secondary',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  title,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
  
  const variantStyles = {
    primary: 'text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 border border-transparent',
    secondary: 'text-pink-700 bg-white hover:bg-pink-50 focus:ring-pink-500 border border-pink-300 shadow-sm',
    danger: 'text-red-700 bg-white hover:bg-red-50 focus:ring-red-500 border border-red-300 shadow-sm',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 border border-transparent',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm leading-4',
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };
  
  const iconSpacing = children ? 'mr-1' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={ariaLabel}
      title={title}
    >
      {Icon && (
        <Icon className={`${iconSizes[size]} ${iconSpacing}`} />
      )}
      {children}
    </button>
  );
};

export default Button;