import { FormEvent, useEffect, useState } from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import { PASSWORD_RESET } from "../../Services/Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);

    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response?.ok) navigate("/login");
    }
  }

  return (
    <div>
      <Head title="Resete a Senha" />
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>

      <Error error={error} />
    </div>
  );
};

export default LoginPasswordReset;
