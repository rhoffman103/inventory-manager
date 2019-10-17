import React, { useContext } from 'react';
import appContext from '../context/appContext';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import AdminSidebar from '../components/SideBar/AdminSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import Spinner from '../components/common/Modals/Spinner';
import AdminComponentsRouter from '../routers/AdminComponentsRouter';

const Admin = () => {

    const { state } = useContext(appContext);

    return (
        <>
            { !state.auth.admin && <Redirect to='/' /> }
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