import React from 'react';
import { RegisterProvider } from './context';
import { FormRegister } from './form';

const Register = () => {
    return (
        <RegisterProvider>
            <FormRegister />
        </RegisterProvider>
    );
}

export { Register };