import { createContext } from 'react';

const appContext = createContext();

const initialState = {
    adminPage: {
        msg: null,
        components: {}
    },
    auth: {},
    emptyCurrentForm: false,
    updateEmployee: {}
};

export { initialState, appContext as default };