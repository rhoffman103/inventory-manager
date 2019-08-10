const appReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_LOAD':
            return { ...state, hello: action.hello };
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    };
};

export default appReducer;