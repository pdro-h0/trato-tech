import { ComponentProps, ReactNode } from 'react';
import styles from './styles.module.scss'

interface ButtonProps extends ComponentProps<"button">{
    children: ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <button className={styles.button} { ...props }>
    {children}
  </button>;
}

export default Button