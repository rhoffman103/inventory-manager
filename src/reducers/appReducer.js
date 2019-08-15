const appReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };

    switch (action.type) {
        case 'INITIAL_LOAD':
            return newState;
        case 'SIMPLE_STATE_UPDATE':
            return { ...state, [action.key]: action.value };
        case 'LOGIN_USER':
            return { ...state, user: { name: action.userName, id: action.id }};
        default:
            return state;
    };
};

export default appReducer;