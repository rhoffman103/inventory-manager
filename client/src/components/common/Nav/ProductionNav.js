import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import { Link } from 'react-router-dom';
import LogOut from './links/LogOut';

const ProductionNav = () => {
    const { state } = useContext(appContext);
    const { navbar } = state;

    return (
        state.auth.email
        ?   <>
                { navbar.page !== 'home' && <Link to="/" className="nav-link">Home</Link> }
                { navbar.page !== 'production' && <Link to="/production" className="nav-link">Production</Link>}
                <LogOut />
            </>
        :   <></>
    );
};

export default ProductionNav;