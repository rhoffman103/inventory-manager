const componentsReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };
    switch(action.type) {
        case 'INITIAL_LOAD':
            return newState;
        case 'UPDATE_ADMIN_PAGE':
            return newState;
        case 'SET_MODAL_SPINNER':
            return newState;
        case 'HANDLE_MODAL':
            return { ...state, showSpinner: false, isModal: action.isModal };
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    };
};

export default componentsReducer;