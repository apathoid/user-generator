export function validateField(fieldScheme, fieldValue) {
    if (fieldScheme.required && !fieldValue) {
        return false;
    }

    if (!fieldValue) {
        return true;
    }

    return new RegExp(fieldScheme.pattern).test(fieldValue);
}


export function validateDate(value) {
    const parsedDate = value.match(/\d{2}\.\d{2}\.\d{4}$/);

    if (!parsedDate?.[0]) {
        return false;
    }

    const dateParts = parsedDate[0].split('.');
    const day = +dateParts[0];
    // Date month is zero based
    const month = +dateParts[1] - 1;
    const year = +dateParts[2];

    const date = new Date(year, month, day);

    const isValid = (
        date.getFullYear() === year
        && date.getMonth() === month
        && date.getDate() === day
    );

    return isValid;
}


export function getSanitizedUserData(userData) {
    const newUserData = { ...userData };

    Object.entries(newUserData).forEach(([key, value]) => {
        if (
            key === 'name'
            || key === 'surname'
            || key === 'patronymic'
            || key === 'email'
            || key === 'phone'
        ) {
            newUserData[key] = value.trim();
        }

        if (key === 'email' || key === 'phone') {
            newUserData[key] = value.replaceAll(' ', '');
        }

        if (key === 'report') {
            if (!value.active || value.active && !value.subject) {
                newUserData[key].active = false;
                newUserData[key].subject = '';
            }
        }
    });

    return newUserData;
}
