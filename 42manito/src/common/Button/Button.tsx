import { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export function Button({ children, size, variant, ...props }: ButtonProps) {
  return (
    <button className={styles.base} {...props}>
      {children}
    </button>
  );
}
