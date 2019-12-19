import React, { useContext } from 'react';
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
                    <h2>For Demo Usage</h2>
                    <p className='mb-1'>Login as a manager.</p>
                    <ul>
                        <li>Email: manager@123.com</li>
                        <li>Password: pass12</li>
                    </ul>
                    <p className='mb-1'>Login as an operator.</p>
                    <ul>
                        <li>Email: operator@123.com</li>
                        <li>Password: pass12</li>
                    </ul>

                    <p>
                        Inventory Manager is a mock-up application to manage production for a specialized manufacturing process.
                        Managers can add new products to the database to create new job jackets and update the running schedule.
                        Operators get an updated schedule to add new product, scrap and downtime while keeping track of a job jackets progress.
                    </p>

                    <p>
                        Checkout the source code! <a href="https://github.com/rhoffman103/inventory-manager">https://github.com/rhoffman103/inventory-manager</a>
                    </p>
                </div>
            :   <></>
            }
            <LoginForm />
        </>
    );
};

export default Home;