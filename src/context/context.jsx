import React, { createContext, useState } from 'react';
import { Instance } from '../api/api';

const crudContext = createContext();

const CrudProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [oneData, setOneData] = useState("");
    const [oneDataId, setOneDataId] = useState("");

    const dateFormat = (dates) => {
        const dataInstance = new Date(dates);
        const optionsFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const formatCompleted = dataInstance.toLocaleDateString('es-ES', optionsFormat);
        return formatCompleted;
    }

    const getCostumer = async (endPoint) => {
        try {
            const getInstance = await Instance.get(`${endPoint}/`);
            console.log(getInstance.data.data)
            if (getInstance.data.data.data) {
                setData(getInstance.data.data.data);
            } else {
                setData(getInstance.data.data);
            };
        } catch (error) {
            console.error(error);
        };
    };

    const getOneElement = async (endPoint, id) => {
        try {
            const getInstance = await Instance.get(`${endPoint}/${id}/single`);
            if (getInstance.data.data.data) {
                setOneData(getInstance.data.data.data);
                setOneDataId(getInstance.data.data.data.id);
            } else {
                setOneData(getInstance.data.data);
                setOneDataId(getInstance.data.data.id);
            };

        } catch (error) {
            console.error(error);
        };
    };

    const deletedOneElement = async (endPoint, id) => {
        try {
            await Instance.delete(`${endPoint}/${id}/delete/`);
            await getCostumer(endPoint);
        } catch (error) {
            console.error(error);
        };
    };

    const createElemten = async (endPoint, data, doc = false) => {
        try {
            if (doc) {
                await Instance.post(`${endPoint}/create`, data,
                {headers: { 
                    "Content-Type": "multipart/form-data"
                }}
                );
            } else {
                await Instance.post(`${endPoint}/create`, data);
            }

            await getCostumer(endPoint);
        } catch (error) {
            console.error(error);

        };
    };

    const updatedElement = async (endPoint, id, data, doc = false) => {
        try {
            if (doc) {
                await Instance.put(`${endPoint}/${id}/update`, data,
                {headers: { 
                    "Content-Type": "multipart/form-data"
                }}
                );
            } else {
                await Instance.put(`${endPoint}/${id}/update`, data);
            }
            await getCostumer(endPoint);
            setOneData("");
            setOneDataId("");
        } catch (error) {
            console.error(error);

        };
    };

    const values = {
        getCostumer,
        updatedElement,
        oneData,
        oneDataId,
        setOneData,
        deletedOneElement,
        createElemten,
        getOneElement,
        data,
        dateFormat,
    };

    return (
        <crudContext.Provider value={values}>
            {children}
        </crudContext.Provider>
    );
};

export { CrudProvider, crudContext };