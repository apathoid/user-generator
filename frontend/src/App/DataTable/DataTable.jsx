import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import FloatingTable from '../../shared/FloatingTable/FloatingTable';

import { Api } from '../../api';
import { APP_HEADER_HEIGHT, conferences } from '../../constants';

import { useAppContext } from '../context/AppContext';


export default function DataTable() {
    const api = new Api();
    const headerData = useMemo(getHeaderData, []);

    const { showDataTable, setShowDataTable } = useAppContext();

    const [data, setData] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useEffect(() => {
        if (showDataTable) {
            setIsDataLoading(true);

            api.get('/api/participants').then(response => {
                response.json()
                    .then(result => {
                        const participantsData = result.map(participant => {
                            return headerData.map(cell => {
                                const participantData = {
                                    value: cell.value
                                };

                                const data = participant[cell.value];

                                if (cell.value === 'report') {
                                    participantData.name = data.active ? data.subject : '-';
                                } else if (cell.value === 'conference') {
                                    participantData.name = conferences[data].name;
                                } else {
                                    participantData.name = data;
                                }

                                return participantData;
                            });
                        });

                        setIsDataLoading(false);
                        setData(participantsData);
                    })
                    .catch(() => setIsDataLoading(true));
            });
        }
    }, [showDataTable]);

    useEffect(() => {
        const onEscape = e => {
            if (e.key === 'Escape') {
                setShowDataTable(false);
            }
        };

        document.addEventListener('keydown', onEscape);

        return () => {
            document.removeEventListener('keydown', onEscape);
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'absolute',
                top: `${APP_HEADER_HEIGHT + 50}px`,
                left: '50%',
                height: '70%',
                transform: (
                    !showDataTable
                        ? `translate(-50%, calc(-100% - ${APP_HEADER_HEIGHT + 50}px))`
                        : 'translate(-50%, 0%)'
                ),
                visibility: showDataTable ? 'visible' : undefined,
                transition: 'transform 0.3s',
                zIndex: 1
            }}
            onTransitionEnd={e => {
                e.target.style.visibility = showDataTable ? 'visible' : 'hidden'
            }}
        >
            <FloatingTable
                title="Список участников"
                header={headerData}
                data={data}
                isLoading={isDataLoading}
            />
        </div>,
        document.body
    );
}


function getHeaderData() {
    return [
        { name: 'Имя', value: 'name' },
        { name: 'Фамилия', value: 'surname' },
        { name: 'Отчество', value: 'patronymic' },
        { name: 'Дата рождения', value: 'birthday' },
        { name: 'Электронная почта', value: 'email' },
        { name: 'Телефон', value: 'phone' },
        { name: 'Конференция', value: 'conference' },
        { name: 'Тема доклада', value: 'report' }
    ];
}
