import React, { useContext } from 'react';
import appContext from '../context/appContext';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/common/Nav';
import ProductionSidebar from '../components/SideBar/ProductionSidebar';
import MainContainer from '../components/common/Main/MainContainer';
import Main from '../components/common/Main';
import Spinner from '../components/common/Modals/Spinner';
import ProductionComponentsRouter from '../routers/ProductionComponentsRouter';

const Production = (props) => {

    const { state } = useContext(appContext);

    return (
        <>
            { !state.auth.uid && <Redirect to='/' /> }
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
};

export default Production;