import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import Navigator from '../components/common/Nav';
import SignupForm from '../components/auth/SignUpForm';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);

    useEffect(() => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'admin',
            value: {
                msg: 'Admin Page'
            }
        })
    }, []);

    return (
        <>
            <Navigator adminPage={true} />
            <div className="container">
                {state.admin 
                    ? state.admin.msg &&
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