import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import useHandleComponents from '../hooks/useHandleComponents';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import AdminSidebar from '../components/SideBar/AdminSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import SignupForm from '../components/auth/SignUpForm';
import Spinner from '../components/common/Modals/Spinner';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { auth, adminPage } = state;
    const { components } = adminPage;
    const { unmountAll } = useHandleComponents();

    useEffect(() => {
        stateDispatch({
            type: 'SIMPLE_STATE_UPDATE',
            key: 'adminPage',
            value: {
                ...state.adminPage,
                msg: 'Admin Page'
            }
        });

        return () => {
            unmountAll('adminPage');
        };

    }, [stateDispatch]);

    return (
        <>
            { !auth && <Redirect to='/' /> }
            <NavBar page='admin' />
            <MainContainer>
                <AdminSidebar />
                <Main>
                    { state.adminPage.msg && <h1>{state.adminPage.msg}</h1> }
                    { components.addNewEmployee && <SignupForm /> }
                </Main>
            </MainContainer>
            <Spinner />
        </>
    );
};

export default Admin;