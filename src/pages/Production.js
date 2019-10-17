import React, { useContext } from 'react';
import appContext from '../context/appContext';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import ProductionSidebar from '../components/SideBar/ProductionSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import Spinner from '../components/common/Modals/Spinner';
import ProductionComponentsRouter from '../routers/ProductionComponentsRouter';

const Production = () => {

    const { state } = useContext(appContext);

    return (
        <>
            { !state.auth && <Redirect to='/' /> }
            <NavBar page='production' />
            <MainContainer>
                <ProductionSidebar />
                <Main>
                    <ProductionComponentsRouter />
                </Main>
            </MainContainer>
            <Spinner />
        </>
    );
};

export default Production;