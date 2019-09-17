const authenticationReducer = (state = {}, action) => {
    const newState = { ...state, ...action.stateUpdate };

    switch (action.type) {
        case 'LOGIN_USER':
            return newState;
        case 'LOGIN_ERROR':
            return newState;
        case 'RESET_LOGIN_ERROR':
            return newState;
        case 'SIGNOUT':
            return newState;
        default:
            return state;
    };
};

export default authenticationReducer;