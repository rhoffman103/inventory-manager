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
        case 'SCHEDULE_RETRIEVED':
            return { ...state, ...action.db };
        case 'SCHEDULE_UPDATE':
            return {
                ...state,
                schedule: action.schedule,
                jobJackets: action.jobJackets,
                scheduleUpdated: true
            };
        case 'SCHEDULE_DRAG_UPDATE':
            return { ...state, schedule: action.schedule };
        case 'DUMMY_DB':
            return { ...state, ...action.db };
        default:
            return state;
    };
};

export default databaseReducer;