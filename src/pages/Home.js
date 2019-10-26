import React, { useContext, useEffect, useState } from 'react';
import appContext from '../context/appContext';
import NavBar from '../components/common/Nav';
import LoginForm from '../components/auth/LoginForm';

const Home = () => {

    const { state } = useContext(appContext);

    return (
        <>
            <NavBar page='home' />
            {state.auth.onFirebaseAuth
            ?
                <div className="container">
                    <h1>Home Page</h1>
                </div>
            :   <></>
            }
            <LoginForm />
        </>
    );
};

export default Home;