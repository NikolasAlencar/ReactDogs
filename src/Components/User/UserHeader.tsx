import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface LocationFactory {
  [key: string]: string;
}

const UserHeader = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();

  function getTitle(pathName: string) {
    const locationFactory: LocationFactory = {
      "/conta/postar": "Poste Sua Foto",
      "/conta/estatisticas": "Estatísticas",
    };

    return locationFactory[pathName] || "Minha Conta";
  }

  useEffect(() => setTitle(getTitle(location.pathname)), [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
