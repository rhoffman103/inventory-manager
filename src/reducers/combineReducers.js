const combineReducers = (reducers) => {
    return (state, action) => {
        return {
            ...state,  
            ...Object.keys(reducers).reduce((newState, key) => {
                return {
                    ...newState,
                    ...reducers[key](state[key], action)
                };
            }, {})
        };
    };
};

export default combineReducers;