import React, { useContext } from 'react';
import navContext from '../../../context/navContext';
import { Link } from 'react-router-dom'
import LogOut from './links/LogOut';

const AdminNav = () => {
    const { navState } = useContext(navContext);

    return (
        <>
            { navState.page !== 'home' && <Link to="/" className="nav-link">Production</Link> }
            { navState.page !== 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
            <LogOut />
        </>
    );
};

export default AdminNav;