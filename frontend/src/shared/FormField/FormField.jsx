import React from 'react';

import './styles.css';


export default function FormField(props) {
    const { label, errorMessage, className, ...inputProps } = props;

    return (
        <div className={"form-field" + (className ? ` ${className}` : "")}>
            <input
                className={
                    "form-field__input"
                    + (errorMessage ? " form-field__input_error" : "")
                }
                { ...inputProps }
            />

            {errorMessage &&
                <p className="form-field__error-message">
                    {errorMessage}
                </p>
            }
        </div>
    );
}
