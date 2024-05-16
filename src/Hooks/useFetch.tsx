import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url: string, options: RequestInit) => {
    let response;
    let json;

    try {
      setError("");
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok) throw new Error(json.message);
    } catch (e: unknown) {
      if (e instanceof Error) {
        json = null;
        setError(e.message);
      }
    } finally {
      setData(json);
      setLoading(false);
      // eslint-disable-next-line no-unsafe-finally
      return { response, json };
    }
  }, []);

  return { data, loading, error, request };
};

export default useFetch;
