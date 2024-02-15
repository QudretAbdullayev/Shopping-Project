import { Routes, Route } from "react-router-dom";
import { roots } from "./constants";
import { Header, Footer } from "../components";
import { Home, Products, Product,Payment } from "../pages";
import { useState } from "react";

const MainRoutes = () =>{
    const [loginRegisterIsActive, setLoginRegisterIsActive] = useState(false);
    const ProductsWrapper = () => {
        return <Product loginRegisterIsActive={loginRegisterIsActive} setLoginRegisterIsActive={setLoginRegisterIsActive} />;
    };
    return (
        <>
            <Header loginRegisterIsActive={loginRegisterIsActive} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
            <Routes>
                <Route path={roots.HOME} element={<Home />}/>
                <Route path={roots.PRODUCTS} element={<Products />} />
                <Route path={`${roots.PRODUCT}:id`} element={<ProductsWrapper />}/>
                <Route path={roots.PAYMENT} element={<Payment />}/>
            </Routes>
            <Footer />
        </>    
    )
}

export default MainRoutes;