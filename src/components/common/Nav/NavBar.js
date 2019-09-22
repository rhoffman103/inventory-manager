import React, { useContext, useEffect } from 'react';
import appContext from '../../../context/appContext';
import { updatePageState } from '../../../actions/navActions';
import { Link } from 'react-router-dom';
import * as BootNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthNav from './AuthNav';

const NavBar = (props) => {

    const { stateDispatch } = useContext(appContext);

    useEffect(() => {
        stateDispatch(updatePageState(props.page))
    }, [ stateDispatch, props.page]);

    return (
        <BootNavbar bg="light" expand="sm" className="sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand">Inventory Manager</Link>
                <BootNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <AuthNav {...props} />
                    </Nav>
                </BootNavbar.Collapse>
            </div>
        </BootNavbar>
    );
};

export default NavBar;