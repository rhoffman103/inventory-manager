import React, { useContext } from 'react';
import appContext from '../../../context/appContext';
import navContext from '../../../context/navContext';
import ProductionNav from './ProductionNav';
import AdminNav from './AdminNav';
import LogOut from './links/LogOut';
import LogIn from './links/LogIn';

const AuthNav = () => {
    const { state } = useContext(appContext);
    const { navState } = useContext(navContext);
    
    return (
        <>
            {(state.onFirebaseAuth &&
                (state.auth.admin
                ?   navState.page === 'admin'
                        ?   
                            <>
                                <AdminNav />
                                <LogOut />
                            </>
                        :   
                            <>
                                <ProductionNav />
                                <LogOut />
                            </>
                :
                    <>
                        <ProductionNav />
                        <LogIn />
                    </>
                )
            )}
        </>
    );
};

export default AuthNav;