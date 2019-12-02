const formRequestReducer = (state = {}, action) => {
    switch(action.type) {
        case 'FORM_REQUEST_COMPLETE':
            return { 
                ...state,
                data: action.data,
                emptyCurrentForm: action.emptyCurrentForm || false
            };
        default:
            return state;
    };
};

export default formRequestReducer;