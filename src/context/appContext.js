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
    updateEmployee: {},
    navbar: { page: 'home' }
};

export { initialState, appContext as default };