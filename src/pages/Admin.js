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
import NewProduct from '../components/adminCompnents/Products/NewProduct';
import AddNewJobJacket from '../components/adminCompnents/AddNewJobJacket';

const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { auth, currentPage } = state;
    const { components } = currentPage;
    const { unmountAll } = useHandleComponents();

    useEffect(() => {
        stateDispatch({
            type: 'UPDATE_PAGE',
            currentPage: {
                ...currentPage,
                components: {
                    title: 'Dashboard'
                },
                page: 'adminPage',
                msg: 'Admin Page',
            }
        });

        return () => {
            unmountAll();
        };

    }, [stateDispatch]);

    return (
        <>
            { !auth.admin && <Redirect to='/' /> }
            <NavBar page='admin' />
            <MainContainer>
                <AdminSidebar />
                <Main>
                    <h1>{components.title}</h1>
                    { components.addNewEmployee && <SignupForm /> }
                    { components.employees && <Employees /> }
                    { components.newProduct && <NewProduct /> }
                    { components.addNewJobJacket && <AddNewJobJacket />}
                </Main>
            </MainContainer>
            <Spinner />
        </>
    );
};

export default Admin;