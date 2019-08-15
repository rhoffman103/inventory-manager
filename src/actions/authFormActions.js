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