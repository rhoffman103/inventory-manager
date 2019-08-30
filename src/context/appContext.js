import { createContext } from 'react';

const appContext = createContext();

const initialState = {
    adminPage: {
        msg: null,
        components: {}
    },
    auth: null,
    emptyCurrentForm: false
};

export { initialState, appContext as default };