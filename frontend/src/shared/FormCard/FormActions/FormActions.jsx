import React from 'react';

import './styles.css';


export default function FormActions(props) {
    const { children, className } = props;

    return (
        <div className={"form__actions" + (className ? ` ${className}` : "")}>
            {children}
        </div>
    );
}
