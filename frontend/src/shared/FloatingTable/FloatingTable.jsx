import React from 'react';

import './styles.css';


export default function FloatingTable(props) {
    const { title, header, data } = props;

    return (
        <div className="floating-table-card">
            <h3 className="floating-table-title">
                {title}
            </h3>
            <div className="floating-table-container">
                <table className="floating-table">
                    <thead>
                        <tr>
                            {header.map(head => (
                                <th key={head.value}>
                                    {head.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIdx) => (
                            <tr key={rowIdx}>
                                {row.map(cell => (
                                    <td
                                        key={cell.value}
                                        className={cell.name === "-" ? "floating-table__cell_empty" : ""}
                                    >
                                        {cell.name}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
