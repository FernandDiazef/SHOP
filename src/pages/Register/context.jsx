import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../../api/api';

const registerContext = createContext();

const RegisterProvider = ({ children }) => {
    const navigate = useNavigate();

    const createElemten = async (data) => {
        try {
            await Instance.post(`users/create`, data);
        } catch (error) {
            console.error(error);

        };
    };

    const onFinish = (values) => {
        createElemten(values);
        navigate("/login");
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const values = {
        onFinish,
        onFinishFailed,
    };

    return (
        <registerContext.Provider value= {values}>
            {children}
        </registerContext.Provider>
    );
};

export { registerContext, RegisterProvider };