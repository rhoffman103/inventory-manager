import React, { useEffect, useReducer } from 'react';
import appContext from '../../context/appContext';
import appReducer from '../../reducers/appReducer';

const StateProvider = ({ children }) => {

    const [state, stateDispatch] = useReducer(appReducer, {});

    useEffect(() => {
        stateDispatch({
            type: 'INITIAL_LOAD',
            hello: 'Hello!!!'
        });
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