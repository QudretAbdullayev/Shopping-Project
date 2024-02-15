import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { roots } from "../../routes/constants";

const ProtectedLayout = () => {
  const { token } = useSelector((state) => state.auth);
  console.log(token)
  return <>{token=="" ? <Navigate to={roots.HOME} /> : <Outlet />}</>;
};

export default ProtectedLayout;