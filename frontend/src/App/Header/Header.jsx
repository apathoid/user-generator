import React from 'react';

import './styles.css';
import List from '../../assets/icons/list.svg';
import Close from '../../assets/icons/close.svg';

import { APP_HEADER_HEIGHT } from '../../constants';

import { useAppContext } from '../context/AppContext';


export default function Header() {
    const { showDataTable, setShowDataTable } = useAppContext();

    return (
        <header
            className="app-header"
            style={{
                height: `${APP_HEADER_HEIGHT}px`
            }}
        >
            <h1 className="app-header__title">
                Регистрация участника
            </h1>

            <button
                type="button"
                title="Показать список участников"
                className="app-header__table-btn"
                onClick={() => setShowDataTable(!showDataTable)}
            >
                <Close
                    viewBox="-2 -2 16 16"
                    className={
                        "app-header__btn-icon app-header__btn-icon_close"
                        + (showDataTable ? " app-header__btn-icon_visible" : "")
                    }
                />

                <List
                    viewBox="-3 0 20 20"
                    className={
                        "app-header__btn-icon app-header__btn-icon_list"
                        + (!showDataTable ? " app-header__btn-icon_visible" : "")
                    }
                />
            </button>
        </header>
    );
}
