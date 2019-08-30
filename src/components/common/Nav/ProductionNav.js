import React, { useContext } from 'react';
import appContext from '../../../context/appContext'
import { Link } from 'react-router-dom';

const ProductionNav = () => {
    const { state } = useContext(appContext);

    return (
        state.auth.admin
            ?   <Link to="/admin" className="nav-link">Admin</Link>
            :   <></>
    );
};

export default ProductionNav;