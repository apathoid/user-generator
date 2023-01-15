import React from 'react';

import './styles.css';


export default function FormSelectField(props) {
    const { value, selectValue, options, errorMessage, ...selectProps } = props;

    return (
        <div className="form-select-field">
            <select
                className={
                    "form-select-field__selector"
                    + (errorMessage ? " form-select-field__selector_error" : "")
                }
                value={value}
                onChange={e => selectValue(e.target.value)}
                { ...selectProps }
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>

            {errorMessage &&
                <p className="form-select-field__error-message">
                    {errorMessage}
                </p>
            }
        </div>
    );
}
