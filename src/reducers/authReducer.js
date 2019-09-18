const authenticationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                auth: { ...action.auth },
                isModal: action.isModal
            };
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    loginError: action.loginError
                }
            };
        case 'SIGNOUT':
            return { ...state, auth: action.auth };
        default:
            return state;
    };
};

export default authenticationReducer;