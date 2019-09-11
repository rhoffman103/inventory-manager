const appReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };

    switch (action.type) {
        case 'INITIAL_LOAD':
            return newState;
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        case 'HANDLE_MODAL':
            return { ...state, showSpinner: false, isModal: action.isModal}
        case 'LOGIN_USER':
            return newState;
        case 'LOGIN_ERROR':
            return newState;
        case 'RESET_LOGIN_ERROR':
            return newState;
        case 'SIGNOUT':
            return newState;
        case 'ADD_NEW_EMPLOYEE_COMPLETE':
            return { 
                ...state,
                showSpinner: action.showSpinner,
                formRequest: action.formRequest
            };
        case 'UPDATE_ADMIN_PAGE':
            return newState;
        case 'SET_MODAL_SPINNER':
            return newState;
        case 'FORM_REQUEST_COMPLETE':
            return {
                ...state,
                showSpinner: action.showSpinner,
                formRequest: action.formRequest,
                isModal: action.isModal
            };
        default:
            return state;
    };
};

export default appReducer;