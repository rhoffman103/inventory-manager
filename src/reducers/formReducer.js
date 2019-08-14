import zxcvbn from "zxcvbn";

const isEmail = (state, { key, value }) => {
    const emailRegex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    const validated = emailRegex.test(value.trim());
    return {
        ...state,
        [key]: validated,
        isDirty: validated
    };
};

const compareEmails = (state, { email, confirmEmail }) => {
    const validated = (email === confirmEmail);
    return { 
        ...state, 
        emailsMatch: validated,
        isDirty: validated
    };
};

const validatePasswordStrength = ( state, password) => {
    const minStrength = 3;
    const passwordStrength = zxcvbn(password).score;
    if (password.length > 0 ) {
        if ((passwordStrength >= minStrength) && (password.length >= 8)) {
            return {
                ...state,
                isPassword: true,
                passwordError: false,
                passwordMsg: ''
            };
        } else {
            return {
                ...state,
                isPassword: false,
                passwordError: true,
                passwordMsg: 'Password not strong enough!'
            };
        }
    }
    
    else {
        return {
            ...state,
            isPassword: false,
            passwordError: true,
            passwordMsg: ''
        };
    }
};

const validateMatchingPasswords = (state, { password, confirmPassword }) => {
    const validated = (password === confirmPassword);
    let confirmPassMsg = '';
    if (!validated && ( confirmPassword.length > 0 )) confirmPassMsg = 'Passwords do not match!';

    return { 
        ...state, 
        passwordsMatch: validated,
        confirmPassMsg,
        isDirty: validated
    };
};

const formReducer = (state, action) => {
    switch(action.type) {
        case 'IS_EMAIL':
            return isEmail(state, action);
        case 'COMPARE_EMAILS':
            return compareEmails(state, action);
        case 'CHECK_PASSWORD_STRENGTH':
            return validatePasswordStrength(state, action.password)
        case 'CHECK_MATCHING_PASSWORDS':
            return validateMatchingPasswords(state, action);    
        default:
            return { idiot: true };
    };
};

export default formReducer;