import React, { createContext, useContext, useState } from 'react';

import { USER_INFO_FORM_STEP } from '../../../../constants';


const Context = createContext({});


export function ProvideFormContext({ children }) {
    const context = useProvidedFormContext();

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export function useFormContext() {
    const context = useContext(Context);

    return context;
}

const defaultUserData = {
    name: '',
    surname: '',
    patronymic: '',
    birthday: '',
    email: '',
    phone: '',
    conference: 'math',
    report: {
        active: false,
        subject: ''
    }
};

function useProvidedFormContext() {
    const [formStep, setFormStep] = useState(USER_INFO_FORM_STEP);
    const [userData, setUserData] = useState(defaultUserData);

    const resetUserData = () => {
        setUserData(defaultUserData);
    };

    const prevStep = () => {
        setFormStep(formStep - 1);
    };

    const nextStep = () => {
        setFormStep(formStep + 1);
    };

    const context = {
        formStep,
        userData,
        setFormStep,
        setUserData,
        resetUserData,
        prevStep,
        nextStep
    };

    return context;
}
