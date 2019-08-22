const formReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };

    switch(action.type) {
        case 'IS_EMAIL':
            return newState;
        case 'COMPARE_EMAILS':
            return newState;
        case 'CHECK_PASSWORD_STRENGTH':
            return newState;
        case 'CHECK_MATCHING_PASSWORDS':
            return newState;   
        case 'EMPTY_FORM':
            return newState;
        case 'CHECK_FIRST_NAME':
            return newState;
        case 'CHECK_LAST_NAME':
            return newState;
        case 'CHECK_EMPLOYEE_ID':
            return newState;
        default:
            return { idiot: true };
    };
};

export default formReducer;