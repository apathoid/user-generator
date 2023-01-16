import React, { useState } from 'react';

import './styles.css';

import { Api } from '../../../../api';
import { conferences } from '../../../../constants';
import { getSanitizedUserData } from '../../../../utils';

import { useFormContext } from '../context/FormContext';
import FormHeader from '../../../../shared/FormCard/FormHeader/FormHeader';
import FormFields from '../../../../shared/FormCard/FormFields/FormFields';
import FormActions from '../../../../shared/FormCard/FormActions/FormActions';
import FormActionButton from '../../../../shared/FormActionButton/FormActionButton';
import FormSelectField from '../../../../shared/FormSelectField/FormSelectField';
import FormSwitchableField from '../../../../shared/FormSwitchableField/FormSwitchableField';


export default function ConferenceSubjectsForm() {
    const api = new Api();

    const { userData, setUserData, prevStep, nextStep } = useFormContext();

    const [isRequestBeingProcessed, setIsRequestBeingProcessed] = useState(false);

    const onPrevStep = () => {
        prevStep();
    };

    const onSubmitForm = () => {
        setIsRequestBeingProcessed(true);

        const newUserData = getSanitizedUserData(userData);

        api.post('/api/participants', JSON.stringify(newUserData))
            .then(res => res.json())
            .then(user => {
                setUserData(user);
                nextStep();
                setIsRequestBeingProcessed(false);
            })
            .catch(() => setIsRequestBeingProcessed(false));
    };

    return (
        <>
            <FormHeader title="Выбор конференции" />

            <FormFields>
                <FormSelectField
                    name="conference"
                    required
                    value={userData.conference}
                    options={
                        Object.entries(conferences).map(([key, value]) => ({ name: value.name, value: key }))
                    }
                    selectValue={value => {
                        const newUserData = structuredClone(userData);

                        newUserData.conference = value;
                        newUserData.report = {
                            active: false,
                            subject: ''
                        };

                        setUserData(newUserData);
                    }}
                />

                <div className="conference-subject-form__report-field">
                    <p className="conference-subject-form__report-field-title">
                        Доклад:
                    </p>

                    <FormSwitchableField
                        name="report"
                        placeholder="Тема доклада"
                        required
                        value={userData.report.subject}
                        onChange={e => {
                            const subject = e.target.value;

                            const newUserData = structuredClone(userData);
                            newUserData.report.subject = subject;

                            setUserData(newUserData);
                        }}
                        isActive={userData.report.active}
                        setIsActive={active => {
                            const newUserData = structuredClone(userData);
                            newUserData.report.active = active;

                            setUserData(newUserData);
                        }}
                    />
                </div>
            </FormFields>

            <FormActions>
                <FormActionButton
                    type="button"
                    onMouseDown={onPrevStep}
                >
                    назад
                </FormActionButton>
                <FormActionButton
                    type="button"
                    onMouseDown={onSubmitForm}
                    isLoading={isRequestBeingProcessed}
                >
                    отправить
                </FormActionButton>
            </FormActions>
        </>
    );
}
