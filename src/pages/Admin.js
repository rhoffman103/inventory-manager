import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import useHandleComponents from '../hooks/useHandleComponents';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import AdminSidebar from '../components/SideBar/AdminSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import SignupForm from '../components/adminCompnents/forms/SignUpForm';
import Spinner from '../components/common/Modals/Spinner';
import Employees from '../components/adminCompnents/Employees';

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
                msg: 'Admin Page',
                title: 'Dashboard'
            }
        });

        return () => {
            unmountAll('adminPage');
        };

    }, [stateDispatch]);

    return (
        <>
            { !auth.admin && <Redirect to='/' /> }
            <NavBar page='admin' />
            <MainContainer>
                <AdminSidebar />
                <Main>
                    <h1>{state.adminPage.title}</h1>
                    { components.addNewEmployee && <SignupForm /> }
                    { components.employees && <Employees /> }
                </Main>
            </MainContainer>
            <Spinner />
        </>
    );
};

export default Admin;