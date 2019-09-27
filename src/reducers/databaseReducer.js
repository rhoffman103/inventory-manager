const databaseReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS_LIST':
            return { ...state, productsList: action.products };
        default:
            return state;
    };
};

export default databaseReducer;