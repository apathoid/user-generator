import React from 'react';

import './styles.css';


export default function FormActionButton(props) {
    const { children, className, isLoading, ...otherProps } = props;

    return (
        <button
            className={
                "form-action-button"
                + (isLoading ? " form-action-button_loading" : "")
                + (className ? ` ${className}` : "")
            }
            {...otherProps}
        >
            {isLoading ? 'Загрузка...' : children}
        </button>
    );
}
