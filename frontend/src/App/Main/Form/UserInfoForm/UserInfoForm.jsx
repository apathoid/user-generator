import React, { useMemo, useState } from 'react';

import FormField from '../../../../shared/FormField/FormField';

import { validateDate, validateField } from '../../../../utils';

import { useFormContext } from '../context/FormContext';
import FormHeader from '../../../../shared/FormCard/FormHeader/FormHeader';
import FormFields from '../../../../shared/FormCard/FormFields/FormFields';
import FormActions from '../../../../shared/FormCard/FormActions/FormActions';
import FormActionButton from '../../../../shared/FormActionButton/FormActionButton';


export default function UserInfoForm() {
    const { userData, setUserData, nextStep } = useFormContext();

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
        newFieldsStates[fieldName].isValid && fieldScheme.validate && (
            newFieldsStates[fieldName].isValid = fieldScheme.validate(fieldValue)
        );

        setFieldsStates(newFieldsStates);
    };

    const onNextStep = () => {
        const newFieldsStates = { ...fieldsStates };
        let hasInvalidFields = false;

        fieldsSchemes.forEach(scheme => {
            const fieldValue = userData[scheme.name];

            let isValid = validateField(scheme, fieldValue);
            isValid && scheme.validate && (isValid = scheme.validate(fieldValue));

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
            <FormHeader title="Информация об участнике" />

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
            name: 'name',
            placeholder: 'Имя*',
            pattern: '^[А-яёЁ]+$',
            required: true,
            errorMessage: 'Поле должно состоять из русских букв'
        },
        {
            name: 'surname',
            placeholder: 'Фамилия*',
            pattern: '^[А-яёЁ]+$',
            required: true,
            errorMessage: 'Поле должно состоять из русских букв'
        },
        {
            name: 'patronymic',
            placeholder: 'Отчество*',
            pattern: '^[А-яёЁ]+$',
            required: true,
            errorMessage: 'Поле должно состоять из русских букв'
        },
        {
            name: 'birthday',
            placeholder: 'Дата рождения',
            pattern: '^\\d{2}\\.\\d{2}\\.\\d{4}$',
            validate: value => value ? validateDate(value) : true,
            required: false,
            errorMessage: 'Дата рождения в формате дд.мм.гггг'
        }
    ];
}
