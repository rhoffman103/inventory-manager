const permissionsReducer = (state, action) => {
    switch(action.type) {
        case 'GIVE_ADMIN_PERMISSION':
            return {
                ...state,
                employee: {
                    admin: action.admin
                }
            };
        case 'INCORRECT_EMPLOYEE_NAME':
            return {
                ...state,
                employee: {
                    message: action.message
                }
            };
        default:
            return state;
    }
};

export default permissionsReducer;