import React from 'react';

import './styles.css';


export default function FormHeader(props) {
    const { title, className } = props;

    return (
        <h3 className={"form__header" + (className ? ` ${className}` : "")}>
            {title}
        </h3>
    );
}
