import React, { useEffect, useReducer } from 'react';
import appContext, { initialState } from '../../context/appContext';
import appReducer from '../../reducers/appReducer';
import { getUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

const StateProvider = ({ children }) => {

    const [state, stateDispatch] = useReducer(appReducer, initialState);
    const { admin } = state.auth;

    useEffect(() => {
        stateDispatch({
            type: 'INITIAL_LOAD',
            stateUpdate: { hello: 'Hello!!!' }
        });
        getUser(stateDispatch);
    }, []);

    useEffect(() => {
        if (admin)
            stateDispatch({
                type: 'IS_ADMIN_AT_LOGIN',
                redirectTo: '/admin'
            });
    }, [admin]);
    
    useEffect(() => {
        console.log('UPDATED STATE: ', state);
    }, [state]);

    return (
        <appContext.Provider value={{ state, stateDispatch }}>
            { admin && <Redirect to={state.redirectTo || '/'} /> }
            { children }
        </appContext.Provider>
    );
};

export default StateProvider;