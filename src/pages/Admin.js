import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import AdminSidebar from '../components/SideBar/AdminSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import SignupForm from '../components/auth/SignUpForm';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { auth } = state;

    useEffect(() => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'adminPage',
            value: {
                msg: 'Admin Page'
            }
        });

        return () => {
            stateDispatch({
                type: 'SIMPLE_STATE_UPDATE',
                key: 'adminPage',
                value: null
            })
        };
    }, [stateDispatch]);

    return (
        <>
            { !auth && <Redirect to='/' /> }
            <NavBar page='admin' />
            <MainContainer>
                <AdminSidebar />
                <Main>
                    <div className="px-3">
                        {state.adminPage
                            ? state.adminPage.msg &&
                                <>
                                    <h1>{state.adminPage.msg}</h1>
                                </>
                            :   <></>
                        }
                        { state.isModal && <SignupForm /> }
                    </div>
                </Main>
            </MainContainer>
        </>
    );
};

export default Admin;