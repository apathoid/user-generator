import React from 'react';

import './styles.css';

import { ProvideFormContext } from './Form/context/FormContext';
import Form from './Form/Form';


export default function Main() {
    return (
        <ProvideFormContext>
            <main className="app-main">
                <Form />
            </main>
        </ProvideFormContext>
    );
}
