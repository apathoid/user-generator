import React from 'react';

import {
    USER_CONTACTS_FORM_STEP,
    CONFERENCE_SUBJECTS_FORM_STEP,
    COMPLETE_REGISTER_FORM_STEP
} from '../../../constants';

import { useFormContext } from './context/FormContext';
import FormCard from '../../../shared/FormCard/FormCard';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import UserContactsForm from './UserContactsForm/UserContactsForm';
import ConferenceSubjectsForm from './ConferenceSubjectsForm/ConferenceSubjectsForm';
import CompleteRegisterForm from './CompleteRegisterForm/CompleteRegisterForm';


export default function Form() {
    const { formStep } = useFormContext();

    let FormStepComponent = null;

    switch (formStep) {
        case USER_CONTACTS_FORM_STEP:
            FormStepComponent = <UserContactsForm />;
            break;
        case CONFERENCE_SUBJECTS_FORM_STEP:
            FormStepComponent = <ConferenceSubjectsForm />;
            break;
        case COMPLETE_REGISTER_FORM_STEP:
            FormStepComponent = <CompleteRegisterForm />;
            break;
        default:
            FormStepComponent = <UserInfoForm />;
    }

    return (
        <FormCard>
            {FormStepComponent}
        </FormCard>
    );
}
