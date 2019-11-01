const combineReducers = (reducers) => {
    return (state, action) => {
        return Object.keys(reducers)
            .reduce((newState, key) => {
                newState[key] = reducers[key](state[key], action);
                return newState;
        }, {})
    };
};

const combineReducersSpreadState = (reducers) => {
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

export { combineReducersSpreadState, combineReducers as default };