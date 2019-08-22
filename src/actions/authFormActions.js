import isEmail from 'isemail';
import zxcvbn from "zxcvbn";

export const checkValidEmail = (email = '') => ({
    type: 'IS_EMAIL',
    stateUpdate: { isEmail: isEmail.validate(email, false) }
});

export const compareEmails = (email = '', confirmEmail = '') => ({
    type: 'COMPARE_EMAILS',
    stateUpdate: { emailsMatch: (email.toLowerCase() === confirmEmail.toLowerCase()) }
});

export const checkPasswordStrength = (password = '') => {
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
        type: 'CHECK_PASSWORD_STRENGTH',
        stateUpdate: { ...passwordObj }
    };
};

export const checkMatchingPasswords = (password = '', confirmPassword = '') => {
    const validated = (password === confirmPassword);
    let confirmPassMsg = '';
    
    if (!validated && ( confirmPassword.length > 0 )) confirmPassMsg = 'Passwords do not match!';

    return {
        type: 'CHECK_MATCHING_PASSWORDS',
        stateUpdate: {
            passwordsMatch: validated,
            confirmPassMsg
        }
    };
};

export const checkHasFirstName = (firstName) => {
    let firstNameMsg = null;

    if (typeof firstName === 'string')
        if (firstName.length === 0) firstNameMsg = "Required!";

    return {
        type: 'CHECK_FIRST_NAME',
        stateUpdate: {
            firstNameMsg
        }
    };
};

export const checkHasLastName = (lastName) => {
    let lastNameMsg = null;

    if (typeof lastName === 'string')
        if (lastName.length === 0) lastNameMsg = "Required!";

    return {
        type: 'CHECK_LAST_NAME',
        stateUpdate: {
            lastNameMsg
        }
    };
};

export const checkHasInput = ({ value, msgName, validator, type }) => {
    let message = null;
    let validated = false;

    if (typeof value === 'string') {
        if (value.length === 0) (message = "Required!");
        else validated = true;
    }

    return {
        type,
        stateUpdate: {
            [msgName]: message,
            [validator]: validated
        }
    };
};