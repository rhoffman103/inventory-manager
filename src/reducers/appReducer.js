const appReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };

    switch (action.type) {
        case 'INITIAL_LOAD':
            return newState;
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        case 'LOGIN_USER':
            return newState;
        case 'LOGIN_ERROR':
            return newState;
        case 'RESET_LOGIN_ERROR':
            return newState;
        case 'SIGNOUT':
            return newState;
        case 'ADD_NEW_EMPLOYEE_SUCCESS':
            return newState;
        default:
            return state;
    };
};

export default appReducer;