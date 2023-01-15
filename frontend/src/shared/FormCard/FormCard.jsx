import React from 'react';

import './styles.css';


export default function FormCard(props) {
    return (
        <div className="form-card">
            {props.children}
        </div>
    );
}
