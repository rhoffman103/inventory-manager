import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import { signOut } from '../../../../actions/authActions';

const LogOut = () => {
    const { stateDispatch } = useContext(appContext);

    const handleSignOut = () => {
        signOut(stateDispatch)
    };

    return (
        <span
            className="nav-link pointer"
            onClick={handleSignOut}
        >
            log out
        </span>
    );
};

export default LogOut;