const modalsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return { [action.modal]: true, show: true };
        case 'MODAL_SPINNER':
            return { spinner: true };
        case 'MODAL_WITH_DATA':
            return { [action.modal]: true, data: action.data };
        case 'FORM_REQUEST_COMPLETE':
            return { show: true, formRequestModal: true };
        case 'PRODUCT_QUICK_VIEW':
            return { show: true, formulaModal: true };
        case 'CLOSE_MODAL':
        case 'LOGIN_USER':
        case 'JOB_JACKETS':
        case 'SCHEDULE_RETRIEVED':
            return {};
        default:
            return state;
    };
};

export default modalsReducer;