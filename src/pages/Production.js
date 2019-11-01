import React from 'react';
import { Link } from 'react-router-dom';
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
                <button><Link to='/admin'>admin</Link></button>
                <ProductionComponentsRouter />
            </Main>
        </MainContainer>
        <Spinner />
    </>
);

export default Production;