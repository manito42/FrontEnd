import { ComponentProps } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
  accept?: boolean;
}

export default function Button({ children, accept, ...props }: ButtonProps) {
  const acceptClass = accept
    ? styles["button-accept"]
    : styles["button-reject"];
  return (
    <button className={`${styles.base} ${acceptClass}`} {...props}>
      {children}
    </button>
  );
}
