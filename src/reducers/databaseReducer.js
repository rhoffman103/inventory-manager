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
                return { ...state, ...action.db, originalJacketScheduleState: action.originalJacketScheduleState };
        case 'SCHEDULE_UPDATE':
            return {
                ...state,
                schedule: action.schedule,
                jobJackets: action.jobJackets,
                scheduleUpdated: true,
                changedJackets: action.changedJackets
            };
        case 'SCHEDULE_DRAG_UPDATE':
            return { ...state, schedule: action.schedule };
        default:
            return state;
    };
};

export default databaseReducer;