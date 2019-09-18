const formRequestReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_NEW_EMPLOYEE_COMPLETE':
            return { 
                ...state,
                showSpinner: action.showSpinner,
                formRequest: action.formRequest
            };
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

export default formRequestReducer;