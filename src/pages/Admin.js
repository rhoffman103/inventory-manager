import React, { useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import useHandleComponents from '../hooks/useHandleComponents';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import AdminSidebar from '../components/SideBar/AdminSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import Spinner from '../components/common/Modals/Spinner';
import AdminComponentsRouter from '../routers/AdminComponentsRouter';
const Admin = () => {

    const { state, stateDispatch } = useContext(appContext);
    const { auth, currentPage } = state;
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
                    <AdminComponentsRouter />
                </Main>
            </MainContainer>
            <Spinner />
        </>
    );
};

export default Admin;