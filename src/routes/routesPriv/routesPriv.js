import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LayoutApp } from '../../components/layout/layout';
import { CrudProvider } from '../../context/context';
import { Brands } from '../../pages/brands';
import { Categories } from '../../pages/categories';
import { Home } from '../../pages/home';
import { LoginRoute } from '../../pages/Login/context';
import { Logout } from '../../pages/logout';
import { Products } from '../../pages/products';
import { Users } from '../../pages/users';

const RoutesPriv = () => {
    let roleValidated = JSON.parse(localStorage.getItem("userDecoded"))
    return (
        <>
            <LoginRoute>
                <CrudProvider>

                    <LayoutApp>
                        <Routes>
                            <Route path="/logout" element={<Logout />} />

                            <Route path="/" element={<Home />} />

                            {roleValidated[0] === "Administrador" ?
                                <>
                                    <Route path="/users" element={<Users />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/brands" element={<Brands />} />
                                    <Route path="/categories" element={<Categories />} />

                                </>
                                :
                                <Route path="/categories" element={<Categories />} />
                            }

                            <Route path='*' element={<Navigate to={"/error/404"} />} />
                        </Routes>
                    </LayoutApp>

                </CrudProvider>

            </LoginRoute>
        </>
    );
}

export default RoutesPriv;