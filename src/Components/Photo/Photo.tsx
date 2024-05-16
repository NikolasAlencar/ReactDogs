import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { useEffect } from "react";
import { PHOTO_GET_NO_OPTIONS } from "../../Services/Api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import PhotoContent from "./PhotoContent";
import Head from "../Helper/Head";

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET_NO_OPTIONS(id);

    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
