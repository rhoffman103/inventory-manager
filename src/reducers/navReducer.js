const navReducer = (state, action) => {
    const newState = { ...state, ...action.stateUpdate };
    
    switch (action.type) {
        case 'UPDATE_PAGE_STATE':
            return newState;
        default:
            return state;
    };
};

export default navReducer;