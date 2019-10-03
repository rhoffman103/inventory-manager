const authenticationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                ...action.auth,
                isModal: action.isModal
            };
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                ...action.auth,
                loginError: action.loginError
            };
        case 'IS_ADMIN_AT_LOGIN':
            return { ...state, redirectTo: action.redirectTo };
        case 'SIGNOUT':
            return { onFirebaseAuth: true };
        default:
            return state;
    };
};

export default authenticationReducer;