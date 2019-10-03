const modalsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return { [action.modal]: true, show: true };
        case 'CLOSE_MODAL':
            return {};
        case 'SET_MODAL_SPINNER':
            return { spinner: action.bool };
        case 'MODAL_WITH_DATA':
            return { [action.modal]: true, data: action.data };
        case 'FORM_REQUEST_COMPLETE':
            return { show: true, formRequestModal: true };
        case 'PRODUCT_QUICK_VIEW':
            return { show: true, formulaModal: true };
        default:
            return state;
    };
};

export default modalsReducer;