import { FormEvent } from "react";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { PASSWORD_LOST } from "../../Services/Api";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });

      request(url, options);
    }
  }

  return (
    <section>
      <Head title="Perdeu a senha?" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" name="login" type="text" {...login} />

          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
