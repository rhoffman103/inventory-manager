const databaseReducer = (state = {}, action) => {
    switch(action.type) {
        case 'EMPTY_DB':
            return {};
        case 'SET_PRODUCTS_LIST':
            return {
                ...state,
                productsList: action.products,
                productSelected: action.isSelected || false
            };
        case 'PRODUCT_QUICK_VIEW':
            return { ...state, productQuickview: action.product };
        case 'JOB_JACKETS':
            return { ...state, [action.key]: action.value };
        default:
            return state;
    };
};

export default databaseReducer;