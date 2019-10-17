import { createContext } from 'react';

const appContext = createContext();

const initialState = {
    auth: {},
    components: {
        // currentPage: {
        //     page: 'homePage',
        //     msg: null,
        //     components: { title: '' },
        // }
    },
    db: {},
    forms: {},
    updateEmployee: {},
    modal: {},
    navbar: { page: 'home' }
};

export { initialState, appContext as default };