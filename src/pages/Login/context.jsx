import { Form } from 'antd';
import React, { createContext, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Instance } from '../../api/api';
import jwt_decode from "jwt-decode";

const loginContext = createContext();
const LoginProvider = ({ children }) => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const Authentication = async (data, setModalValidated,) => {
        try {
            const validate = { email: data.email, password: data.password }
            const userValidated = await Instance.post("login/auth", validate);

            if (userValidated.status === 200) {
                localStorage.setItem("user", userValidated.data.data.token);
                let userValidatedDecoded = jwt_decode(userValidated.data.data.token);
                console.log(userValidatedDecoded);
                localStorage.setItem("userDecoded", JSON.stringify(userValidatedDecoded.roles));
                navigate("/");
                setModalValidated(false);
            } else {
                console.error('Inicio de sesión fallido');
                setModalValidated(true);
            }
            form.resetFields();
        } catch (error) {
            if (error.response && error.userValidated.status === 401) {
                console.error('Credenciales incorrectas');
                setModalValidated(true);
            } else {
                console.error('Error al iniciar sesión:', error);
                setModalValidated(true);
            }
            form.resetFields();
        }
    };
    const logout = () => {
        navigate('/login');
        localStorage.removeItem('user');
        localStorage.removeItem('userDecoded');
    };

    const values = {
        logout,
        form,
        Authentication,
    };

    return (
        <loginContext.Provider value={values}>
            {children}
        </loginContext.Provider>
    );
};

const useAuth = () => {
    const auth = useContext(loginContext);
    return auth;
};


const LoginRoute = (props) => {
    const userValidated = localStorage.getItem("user")
    let role =  JSON.parse(localStorage.getItem("userDecoded"));

    if (!userValidated) {
        return <Navigate to="/login" />
    } 

    return props.children;
};

export { loginContext, LoginProvider, LoginRoute, useAuth };