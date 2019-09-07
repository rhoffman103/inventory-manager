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
        case 'ADD_NEW_EMPLOYEE_ERR':
            return newState;
        case 'UPDATE_ADMIN_PAGE':
            return newState;
        case 'SET_MODAL_SPINNER':
            return newState;
        case 'PROMOTE_ADMIN_COMPLETE':
            return { ...state, showSpinner: action.showSpinner, isModal: action.isModal, updateEmployee: action.updateEmployee }
        case 'FORM_REQUEST':
            return { ...state, showSpinner: action.showSpinner, isModal: action.isModal, formRequest: action.formRequest };
        default:
            return state;
    };
};

export default appReducer;