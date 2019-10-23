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
        case 'SET_LOADING_WHEEL':
            return { ...state, showLoadingWheel: action.showLoadingWheel };
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
        case 'HANDLE_AUX_MODAL':
            return { ...state, [action.auxModal]: action.value }
        case 'PRODUCT_QUICK_VIEW':
            return {
                ...state,
                productQuickview: action.productQuickview,
                quickviewModal: action.quickviewModal
            };
        case 'SET_COMPONENT':
            return { ...state, [action.component]: action.value }
        case 'SCHEDULE_LISTENER':
            return { ...state, showLoadingWheel: false };
        default:
            return state;
    };
};

export default componentsReducer;