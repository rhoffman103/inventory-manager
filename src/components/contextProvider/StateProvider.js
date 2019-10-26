import React, { useEffect, useReducer } from 'react';
import appContext, { initialState } from '../../context/appContext';
import appReducer from '../../reducers/appReducer';
import { getUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

const StateProvider = ({ children }) => {

    const [state, stateDispatch] = useReducer(appReducer, initialState);
    const { redirectTo } = state.auth;

    useEffect(() => {
        getUser(stateDispatch);
    }, []);
    
    useEffect(() => {
        console.log('UPDATED STATE: ', state);
    }, [state]);

    return (
        <appContext.Provider value={{ state, stateDispatch }}>
            { redirectTo && <Redirect to={redirectTo || '/'} /> }
            { children }
        </appContext.Provider>
    );
};

export default StateProvider;