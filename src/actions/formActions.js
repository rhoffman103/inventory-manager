export const setEmptyCurrentFormState = (condition) => {
    // contition = type boolean
    return {
        type: 'SIMPLE_STATE_UPDATE',
        key: 'emptyCurrentForm',
        value: condition
    };
};


export const checkHasInput = ({ key, value, hasHadInput, type }) => {
    let message = null;

    if (typeof value === 'string') {
        if (value.length === 0 && hasHadInput === true) (message = "Required!");
        else if (value.length > 0) hasHadInput = true;
    }

    return {
        type,
        stateUpdate: {
            [key]: {
                message,
                hasHadInput,
            }
        }
    };
};

export const removeHasInput = (validation) => {
    const newValidationObj = {};
    const valArray = Object.keys(validation);

    valArray.forEach((key) => {
        if (typeof validation[key] === 'object')
            newValidationObj[key] = { hasHadInput: false }
    });

    return {
        type: 'RESET_VALIDATION',
        stateUpdate: newValidationObj
    };
};