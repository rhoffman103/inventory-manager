import isEmail from 'isemail';
import zxcvbn from "zxcvbn";

export const checkValidEmail = ({ value = '', hasHadInput }) => {
    let message = null;
    const validated = isEmail.validate(value, false);
    
    if (value.length > 0) {
        hasHadInput = true;
        if (!validated && hasHadInput)
            message = 'Invalid Email!';
    }

    else if (!value.length && hasHadInput)
        message = 'Email Is Required!'
    

    return {
        type: 'IS_EMAIL',
        stateUpdate: { 
            email: {
                message,
                hasHadInput,
                validated
            }
        }
    };
};

export const compareEmails = (email = '', confirmEmail = '') => ({
    type: 'COMPARE_EMAILS',
    stateUpdate: { emailsMatch: (email.toLowerCase() === confirmEmail.toLowerCase()) }
});

export const checkPasswordStrength = ({ value: password = '', hasHadInput }) => {
    const minStrength = 3;
    const passwordStrength = zxcvbn(password).score;
    let passwordObj = {};

    if (password.length > 0 ) {
        hasHadInput = true;
        if ((passwordStrength >= minStrength) && (password.length >= 8)) {
            passwordObj.validated = true;
            passwordObj.message = '';
        }
        else {
            passwordObj.validated = false;
            passwordObj.message = 'Password not strong enough!';
        }
    }
    
    else if (hasHadInput) passwordObj.message = 'Password is Required!';

    else {
        passwordObj.validated = false;
        passwordObj.message = '';
    }

    return {
        type: 'CHECK_PASSWORD_STRENGTH',
        stateUpdate: {
            password: { ...passwordObj, hasHadInput }
        }
    };
};

export const checkMatchingPasswords = ({ password = '', confirmPassword = '', hasHadInput }) => {
    const validated = (password === confirmPassword);
    let message = '';
    
    if (confirmPassword.length > 0) {
        hasHadInput = true;
        if (!validated && ( confirmPassword.length > 0 ))
            message = 'Passwords do not match!';
    }

    else if (!confirmPassword && hasHadInput)
        message = 'Please Confirm Password!'

    return {
        type: 'CHECK_MATCHING_PASSWORDS',
        stateUpdate: {
            confirmPassword: {
                validated,
                message,
                hasHadInput
            }
        }
    };
};