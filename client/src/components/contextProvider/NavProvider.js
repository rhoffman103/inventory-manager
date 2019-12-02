import React, { useReducer } from 'react';
import navContext from '../../context/navContext';
import navReducer from '../../reducers/navReducer';

const NavProvider = ({ children }) => {

    const [navState , navDispatch] = useReducer(navReducer, { page: '' });

    return (
        <navContext.Provider value={{ navState, navDispatch }}>
            { children }
        </navContext.Provider>
    );
};

export default NavProvider;