import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import ProductionNav from './ProductionNav';
import AdminNav from './AdminNav';
import LogIn from './links/LogIn';

const AuthNav = () => {
    const { state } = useContext(appContext);
    
    return (
        <>
            {(state.auth.onFirebaseAuth &&
                (state.auth.email ?
                   (state.auth.admin
                    ?   <AdminNav />
                    :   <ProductionNav />
                    )
                :
                   <LogIn />
                )
            )}
        </>
    );
};

export default AuthNav;