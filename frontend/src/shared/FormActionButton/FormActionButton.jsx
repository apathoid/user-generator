import React from 'react';

import './styles.css';


export default function FormActionButton(props) {
    const { children, className, ...otherProps } = props;

    return (
        <button
            className={"form-action-button" + (className ? ` ${className}` : "")}
            {...otherProps}
        >
            {children}
        </button>
    );
}
