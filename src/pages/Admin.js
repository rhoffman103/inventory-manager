import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import NavBar from '../components/common/Nav';
import SignupForm from '../components/auth/SignUpForm';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);

    useEffect(() => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'adminPage',
            value: {
                msg: 'Admin Page'
            }
        })

        return () => {
            stateDispatch({
                type: 'SIMPLE_STATE_UPDATE',
                key: 'adminPage',
                value: null
            })
        }
    }, [stateDispatch]);

    return (
        <>
            <NavBar page='admin' />
            <div className="container">
                {state.adminPage 
                    ? state.adminPage.msg &&
                        <>
                            <h1>{state.adminPage.msg} page</h1>
                        </>
                    :   <></>
                }
                { state.isModal && <SignupForm /> }
            </div>
        </>
    );
};

export default Admin;