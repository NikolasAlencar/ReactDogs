import { useState } from "react";

interface TypeObject {
  [key: string]: {
    regex: RegExp;
    message: string;
  };
}

const types: TypeObject = {
  email: {
    regex:
      /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 digito. Com no mínimo caracteres",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize números apenas.",
  },
};

const useForm = (type?: string) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function validate(value: string) {
    if (!type) return true;

    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onChange(event: { target: { value: string } }) {
    if (error) validate(event.target.value);
    setValue(event.target.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
