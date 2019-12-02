const productionReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SELECT_JOB_JACKET':
            return { ...state, selectedJobJacket: action.jobJacket };
        default:
            return state;
    };
};

export default productionReducer;