import { createContext } from 'react';

const appContext = createContext();

const initialState = {
    auth: {},
    currentPage: {
        page: 'homePage',
        msg: null,
        components: {},
        title: ''
    },
    emptyCurrentForm: false,
    updateEmployee: {}
};

export { initialState, appContext as default };