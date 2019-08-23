import React, { useEffect, useReducer } from 'react';
import appContext, { initialState } from '../../context/appContext';
import appReducer from '../../reducers/appReducer';
import { getUser } from '../../actions/authActions';

const StateProvider = ({ children }) => {

    const [state, stateDispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        stateDispatch({
            type: 'INITIAL_LOAD',
            stateUpdate: { hello: 'Hello!!!' }
        });
        getUser(stateDispatch);
    }, []);

    useEffect(() => {
        console.log('UPDATED STATE: ', state);
    }, [state]);

    return (
        <appContext.Provider value={{ state, stateDispatch }}>
            { children }
        </appContext.Provider>
    );
};

export default StateProvider;