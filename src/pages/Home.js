import React, { useContext, useEffect, useState } from 'react';
import appContext from '../context/appContext';
import Navigator from '../components/common/Nav';
import LoginForm from '../components/auth/LoginForm';

const Home = () => {

    const { state } = useContext(appContext);
    const [localState, setLocalState] = useState({});

    useEffect(() => {
        setLocalState({
            msg: 'Home Page local state!'
        });
    }, []);

    return (
        <>
            <Navigator homePage={true} />
            <div className="container">
                <h1>Home Page</h1>
                { state.hello && <p>Context Message: {state.hello}</p> }
                { localState.msg && <p>Local State: {localState.msg}</p>}
            </div>
            { state.isModal && <LoginForm /> }
        </>
    );
};

export default Home;