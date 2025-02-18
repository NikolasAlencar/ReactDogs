import { ChangeEventHandler, FocusEventHandler } from "react";
import styles from "./Input.module.css";

interface Input {
  label: string;
  name: string;
  type: string;
  value?: number | string;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input = ({
  label,
  type,
  name,
  value,
  error,
  onChange,
  onBlur,
}: Input) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
