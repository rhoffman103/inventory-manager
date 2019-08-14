import isEmail from 'isemail';
import zxcvbn from "zxcvbn";

const validateIsEmail = (state, { key, value }) => {
    return {
        ...state,
        [key]: isEmail.validate(value, false)
    };
};

const compareEmails = (state, { email, confirmEmail }) => {
    return { 
        ...state, 
        emailsMatch: (email.toLowerCase() === confirmEmail.toLowerCase())
    };
};

const validatePasswordStrength = ( state, password) => {
    const minStrength = 3;
    const passwordStrength = zxcvbn(password).score;
    let passwordObj = {};

    if (password.length > 0 ) {
        if ((passwordStrength >= minStrength) && (password.length >= 8)) {
            passwordObj.isPassword = true;
            passwordObj.passwordMsg = '';
        }
        else {
            passwordObj.isPassword = false;
            passwordObj.passwordMsg = 'Password not strong enough!';
        }
    }
    
    else {
        passwordObj.isPassword = false;
        passwordObj.passwordMsg = '';
    }

    return {
        ...state,
        ...passwordObj
    };
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
            return validateIsEmail(state, action);
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