import React from 'react';

import './styles.css';


export default function FormSwitchableField(props) {
    const { value, isActive, setIsActive, errorMessage, ...inputProps } = props;

    return (
        <div className="form-switchable-field">
            <input
                className="form-switchable-field__checkbox"
                type="checkbox"
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
            />
            <input
                className={
                    "form-switchable-field__input"
                    + (errorMessage ? " form-switchable-field__input_error" : "")
                }
                disabled={!isActive}
                value={value}
                { ...inputProps }
            />

            {errorMessage &&
                <p className="form-switchable-field__error-message">
                    {errorMessage}
                </p>
            }
        </div>
    );
}
