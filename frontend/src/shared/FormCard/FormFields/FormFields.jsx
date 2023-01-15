import React from 'react';

import './styles.css';


export default function FormFields(props) {
    const { children, className } = props;

    return (
        <div className={"form__fields" + (className ? ` ${className}` : "")}>
            {children}
        </div>
    );
}
