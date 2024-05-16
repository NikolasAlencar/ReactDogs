import { ComponentProps } from "react";
import styles from "./Button.module.css";

const Button = ({ children, ...props }: ComponentProps<"button">) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
