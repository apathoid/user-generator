import React, { createContext, useContext, useState } from 'react';


const Context = createContext({});


export function ProvideAppContext({ children }) {
    const context = useProvidedAppContext();

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}

export function useAppContext() {
    const context = useContext(Context);

    return context;
}

function useProvidedAppContext() {
    const [showDataTable, setShowDataTable] = useState(false);

    const context = {
        showDataTable,
        setShowDataTable
    };

    return context;
}
