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
        case 'CHECK_HAS_INPUT':
            return newState;
        case 'RESET_VALIDATION':
            console.log('newState: ', {...action.stateUpdate});
            return {...action.stateUpdate};
        default:
            return { idiot: true };
    };
};

export default formReducer;