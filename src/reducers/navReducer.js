const navReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PAGE_STATE':
            return {
                ...state,
                navbar: {
                    page: action.page
                }
            };
        default:
            return state;
    };
};

export default navReducer;