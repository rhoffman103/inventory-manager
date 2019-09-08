import React, { useContext } from 'react';
import appContext from '../../../context/appContext'
import { Link } from 'react-router-dom';
import LogOut from './links/LogOut';

const ProductionNav = () => {
    const { state } = useContext(appContext);

    return (
        state.auth.email
        ?   <LogOut />
        :   <></>
    );
};

export default ProductionNav;