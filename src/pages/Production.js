import React from 'react';
import NavBar from '../components/common/Nav';
import ProductionSidebar from '../components/SideBar/ProductionSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import Spinner from '../components/common/Modals/Spinner';
import ProductionComponentsRouter from '../routers/ProductionComponentsRouter';

const Production = (props) => (
    <>
        <NavBar page='production' />
        <MainContainer>
            <ProductionSidebar {...props} />
            <Main>
                <ProductionComponentsRouter />
            </Main>
        </MainContainer>
        <Spinner />
    </>
);

export default Production;