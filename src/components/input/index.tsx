import { ComponentProps, forwardRef, LegacyRef } from "react";
import styles from "./styles.module.scss";

function InputComponent(
  { ...props }: ComponentProps<"input">,
  ref: LegacyRef<HTMLInputElement>
) {
  return <input {...props} className={styles.input} ref={ref} />;
}

export const Input = forwardRef(InputComponent);
