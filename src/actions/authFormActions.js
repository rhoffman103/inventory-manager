export const checkValidEmail = ({ key = '', value = ''}) => ({
    type: 'IS_EMAIL',
    key,
    value
});

export const checkMatchingEmails = (email = '', confirmEmail = '') => ({
    type: 'COMPARE_EMAILS',
    email,
    confirmEmail
});

export const checkPasswordStrength = (password = '') => ({
    type: 'CHECK_PASSWORD_STRENGTH',
    password
});

export const checkMatchingPasswords = (password = '', confirmPassword = '') => ({
    type: 'CHECK_MATCHING_PASSWORDS',
    password,
    confirmPassword
});