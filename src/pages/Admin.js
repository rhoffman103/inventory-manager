import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import Navigator from '../components/common/Nav';
import SignupForm from '../components/login/SignUpForm';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);

    useEffect(() => {
        if (!state.admin) {
            stateDispatch({
                type: 'MOUNT_PAGE',
                component: 'admin',
                data: {
                    msg: 'Admin Page'
                }
            })
        }
    }, []);

    return (
        <>
        <Navigator adminPage={true} />
            <div className="container">
                {state.admin 
                    ? state.admin.mounted &&
                        <>
                            <h1>{state.admin.msg} page</h1>
                        </>
                    :   <></>
                }
                { state.isModal && <SignupForm /> }
            </div>
        </>
    );
};

export default Admin;