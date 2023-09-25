import React from 'react';
import { LoginProvider } from './context';
import { FormLogin } from './form';

const Login = () => {
    return (
        <LoginProvider>
            <FormLogin />
        </LoginProvider>
    );
}

export { Login };
