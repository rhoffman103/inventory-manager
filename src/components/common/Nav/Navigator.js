import React, { useContext, useEffect } from 'react';
import navContext from '../../../context/navContext';
import { updatePageState } from '../../../actions/navActions';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthNav from './AuthNav';

const Navigator = (props) => {

    const { navDispatch } = useContext(navContext);

    useEffect(() => {
        navDispatch(updatePageState(props.page))
    }, [props, navDispatch]);

    return (
        <Navbar bg="light" expand="md">
            <div className="container">
                <Link to="/" className="navbar-brand">Inventory Manager</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <AuthNav {...props} />
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigator;