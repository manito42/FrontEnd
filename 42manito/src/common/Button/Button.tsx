import { ComponentProps } from "react";
import styles from "./Button.module.css";
import { ButtonType } from "@/Types/General/ButtonType";

interface ButtonProps extends ComponentProps<"button"> {
  buttonType: ButtonType;
}

export default function Button({
  children,
  buttonType,
  ...props
}: ButtonProps) {
  const buttonTypeClass =
    buttonType === ButtonType.ACCEPT
      ? styles["button-accept"]
      : styles["button-reject"];
  return (
    <button className={`${styles.base} ${buttonTypeClass}`} {...props}>
      {children}
    </button>
  );
}
