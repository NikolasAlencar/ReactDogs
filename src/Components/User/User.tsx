import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import NotFound from "../NotFound";
import Head from "../Helper/Head";

const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data?.id} />}></Route>
        <Route path="postar" element={<UserPhotoPost />}></Route>
        <Route path="estatisticas" element={<UserStats />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
