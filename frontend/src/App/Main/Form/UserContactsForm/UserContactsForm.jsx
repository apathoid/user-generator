import React, { useMemo, useState } from 'react';

import FormField from '../../../../shared/FormField/FormField';

import { validateField } from '../../../../utils';

import { useFormContext } from '../context/FormContext';
import FormHeader from '../../../../shared/FormCard/FormHeader/FormHeader';
import FormFields from '../../../../shared/FormCard/FormFields/FormFields';
import FormActions from '../../../../shared/FormCard/FormActions/FormActions';
import FormActionButton from '../../../../shared/FormActionButton/FormActionButton';


export default function UserInfoForm() {
    const { userData, setUserData, prevStep, nextStep } = useFormContext();

    const fieldsSchemes = useMemo(() => getFieldsSchemes(), []);

    const [fieldsStates, setFieldsStates] = useState(
        fieldsSchemes.reduce((state, scheme) => (state[scheme.name] = { isValid: true }, state), {})
    );

    const onChange = e => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        const newFieldsStates = { ...fieldsStates };
        newFieldsStates[fieldName].isValid = true;

        setFieldsStates(newFieldsStates);

        const newUserData = { ...userData };
        newUserData[fieldName] = fieldValue;

        setUserData(newUserData);
    };

    const onBlur = e => {
        const newFieldsStates = { ...fieldsStates };

        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const fieldScheme = fieldsSchemes.find(scheme => scheme.name === fieldName);

        if (!fieldScheme) {
            return;
        }

        newFieldsStates[fieldName] = {
            isValid: validateField(fieldScheme, fieldValue)
        };

        setFieldsStates(newFieldsStates);
    };

    const onPrevStep = () => {
        prevStep();
    };

    const onNextStep = () => {
        const newFieldsStates = { ...fieldsStates };
        let hasInvalidFields = false;

        fieldsSchemes.forEach(scheme => {
            const fieldValue = userData[scheme.name];

            const isValid = validateField(scheme, fieldValue);

            if (!isValid) {
                newFieldsStates[scheme.name].isValid = false;
                hasInvalidFields = true;
            }
        });

        if (!hasInvalidFields) {
            nextStep();
        }

        setFieldsStates(newFieldsStates);
    };

    return (
        <>
            <FormHeader title="Контактные данные" />

            <FormFields>
                {fieldsSchemes.map(scheme => (
                    <FormField
                        key={scheme.name}
                        type="text"
                        name={scheme.name}
                        placeholder={scheme.placeholder}
                        value={userData[scheme.name]}
                        onChange={onChange}
                        onBlur={onBlur}
                        pattern={scheme.pattern}
                        errorMessage={
                            !fieldsStates[scheme.name].isValid
                                ? scheme.required && !userData[scheme.name]
                                    ? 'Поле должно быть заполнено'
                                    : scheme.errorMessage
                                : ''
                        }
                    />
                ))}
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
                    onMouseDown={onNextStep}
                >
                    далее
                </FormActionButton>
            </FormActions>
        </>
    );
}

function getFieldsSchemes() {
    return [
        {
            name: 'email',
            placeholder: 'Почта*',
            pattern: "^(?=((?:[\\w!#$%&'*+-/=?^_`{|}~]+\\.)*))\\1[\\w!#$%&'*+-/=?^_`{|}~]+@(?=((?:(?=((?:[a-zA-Z0-9]+-+)*))\\3[a-zA-Z0-9]+\\.)+))\\2(?=((?:[a-zA-Z0-9]+-+)*))\\4[a-zA-Z0-9]+$",
            required: true,
            errorMessage: 'Некорректный адрес электронной почты'
        },
        {
            name: 'phone',
            placeholder: 'Номер телефона*',
            pattern: '^\\+7\\s?\\d{3}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}\\s?$',
            required: true,
            errorMessage: 'Некорректный номер телефона'
        }
    ];
}
