const componentsReducer = (state, action) => {
    switch(action.type) {
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        case 'INITIAL_LOAD':
            return { ...state, ...action.stateUpdate };
        case 'UPDATE_PAGE':
            return { ...state, currentPage: action.currentPage };
        case 'SET_MODAL_SPINNER':
            return { ...state, showSpinner: action.showSpinner };
        case 'HANDLE_COMPONENT':
            return {
                ...state,
                currentPage: {
                    ...action.currentPage,
                    components: action.components
                }
            };
        case 'HANDLE_MODAL':
            return {
                ...state,
                showSpinner: false,
                isModal: action.isModal
            };
        default:
            return state;
    };
};

export default componentsReducer;