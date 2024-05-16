import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../Services/Api";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  nome: string;
  email: string;
}

interface Context {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => void;
  error: string;
  loading: boolean;
  login: boolean;
  data: User | null;
}

export const UserContext = createContext({} as Context);

export const UserStorage = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userLogout = useCallback(() => {
    setData(null);
    setError("");
    setLoading(false);
    setLogin(false);

    window.localStorage.removeItem("token");
  }, []);

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError("");
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);

      if (!tokenRes.ok)
        throw new Error(`Error usuário inválido: ${tokenRes.statusText}`);

      const { token } = await tokenRes.json();

      window.localStorage.setItem("token", token);

      await getUser(token);

      navigate("/conta");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        setLogin(false);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError("");
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (response.ok) throw new Error("Token inválido");

          await getUser(token);
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
