import React, { useEffect, useReducer } from 'react';
import appContext, { initialState } from '../../context/appContext';
import appReducer from '../../reducers/appReducer';
import { getUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

const StateProvider = ({ children }) => {

    const [state, stateDispatch] = useReducer(appReducer, initialState);
    const { admin, redirectTo, uid } = state.auth;

    useEffect(() => {
        stateDispatch({
            type: 'INITIAL_LOAD',
            stateUpdate: { hello: 'Hello!!!' }
        });
        getUser(stateDispatch);
    }, []);

    useEffect(() => {
        let redirect = '/';
        // for demo purposes, redirect production employees
        // to '/production/px' for blinking notification
        if (uid) {
            if (admin) redirect = '/admin';
            else redirect = '/production/px';
        }

        stateDispatch({
            type: 'REDIRECT_AT_LOGIN',
            redirectTo: redirect
        });
    }, [admin, uid]);
    
    useEffect(() => {
        console.log('UPDATED STATE: ', state);
    }, [state]);

    return (
        <appContext.Provider value={{ state, stateDispatch }}>
            { uid && <Redirect to={redirectTo || '/'} /> }
            { children }
        </appContext.Provider>
    );
};

export default StateProvider;