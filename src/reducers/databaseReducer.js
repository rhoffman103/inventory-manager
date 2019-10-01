const databaseReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS_LIST':
            return {
                ...state,
                productsList: action.products,
                productSelected: action.isSelected || false
            };
        default:
            return state;
    };
};

export default databaseReducer;