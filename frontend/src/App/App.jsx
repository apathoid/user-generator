import React from 'react';

import { ProvideAppContext } from './context/AppContext';
import Header from './Header/Header';
import Main from './Main/Main';
import DataTable from './DataTable/DataTable';


export default function App() {
    if (location.pathname !== '/') {
        return <h1>Запрашиваемая страница не найдена</h1>;
    }

    return (
        <ProvideAppContext>
            <Header />
            <Main />
            <DataTable />
        </ProvideAppContext>
    );
}
