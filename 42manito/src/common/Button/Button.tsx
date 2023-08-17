import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function Button({
  children,
  size,
  fullWidth,
  ...props
}: ButtonProps) {
  const sizeClass = size ? styles[`button-${size}`] : styles['button-medium'];
  return (
    <button
      className={`${styles.base} ${sizeClass} ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
