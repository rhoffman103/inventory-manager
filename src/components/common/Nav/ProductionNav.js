import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
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