import React, { useMemo } from 'react';

import './styles.css';
import CheckmarkCircle from '../../../../assets/icons/checkmark-circle.svg';

import { conferences, USER_INFO_FORM_STEP } from '../../../../constants';

import { useAppContext } from '../../../context/AppContext';
import { useFormContext } from '../context/FormContext';
import FormHeader from '../../../../shared/FormCard/FormHeader/FormHeader';
import FormFields from '../../../../shared/FormCard/FormFields/FormFields';
import FormActions from '../../../../shared/FormCard/FormActions/FormActions';
import FormActionButton from '../../../../shared/FormActionButton/FormActionButton';
import FormField from '../../../../shared/FormField/FormField';


export default function CompleteRegisterForm() {
    const { setShowDataTable } = useAppContext();
    const { userData, setFormStep, resetUserData } = useFormContext();

    const fieldsDesc = useMemo(getFieldsDesc, []);

    const onNewParticipant = () => {
        resetUserData();
        setFormStep(USER_INFO_FORM_STEP);
    };

    return (
        <>
            <div className="register-form-step__form-header-substrate">
                <CheckmarkCircle
                    viewBox="0 0 20 20"
                    className="register-form-step__form-header-icon"
                />
                <FormHeader
                    title="Участник зарегистрирован"
                    className="register-form-step__form-header"
                />
            </div>
            <FormFields className="register-form-step__form-fields">
                {fieldsDesc.map(fieldDesc => (
                    userData[fieldDesc.name] &&
                        <FormField
                            key={fieldDesc.name}
                            className="register-form-step__form-field"
                            type="text"
                            name={fieldDesc.name}
                            value={userData[fieldDesc.name]}
                            disabled
                        />
                ))}
                <FormField
                    type="text"
                    name="report"
                    className="register-form-step__form-field"
                    value={conferences[userData.conference]?.name}
                    disabled
                />
                {userData.report.subject &&
                    <FormField
                        type="text"
                        name="report"
                        className="register-form-step__form-field"
                        value={userData.report.subject}
                        disabled
                    />
                }
            </FormFields>
            <FormActions className="register-form-step__form-actions">
                <FormActionButton
                    className="register-form-step__form-action-btn"
                    type="button"
                    onMouseDown={() => setShowDataTable(true)}
                >
                    Посмотреть список всех участников
                </FormActionButton>
                <FormActionButton
                    className="register-form-step__form-action-btn"
                    type="button"
                    onMouseDown={onNewParticipant}
                >
                    Зарегистрировать нового участника
                </FormActionButton>
            </FormActions>
        </>
    );
}


function getFieldsDesc() {
    return [
        { name: 'name' },
        { name: 'surname' },
        { name: 'patronymic' },
        { name: 'birthday' },
        { name: 'email' },
        { name: 'phone' }
    ];
}
