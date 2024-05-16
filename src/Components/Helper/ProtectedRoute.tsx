import { PropsWithChildren, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { login } = useContext(UserContext);

  return login ? children : <Navigate to="login" />;
};

export default ProtectedRoute;
