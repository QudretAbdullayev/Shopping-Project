import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { Footer } from "../../components";

const PublicLayout = ({loginRegisterIsActive,setLoginRegisterIsActive}) => {
  return (
    <>
      <Header loginRegisterIsActive={loginRegisterIsActive} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
