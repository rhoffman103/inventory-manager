const databaseReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS_LIST':
            return {
                ...state,
                productsList: action.products,
                productSelected: action.isSelected || false
            };
        case 'PRODUCT_QUICK_VIEW':
            return { ...state, productQuickview: action.product };
        default:
            return state;
    };
};

export default databaseReducer;