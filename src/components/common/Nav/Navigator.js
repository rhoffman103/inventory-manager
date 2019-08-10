import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AdminNav from './AdminNav';

const Navigator = (props) => {

    return (
        <Navbar bg="light" expand="md">
            <div className="container">
                <Link to="/" className="navbar-brand">Inventory Manager</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        { !props.homePage && <Link to="/" className="nav-link">Home</Link> }
                        { !props.adminPage
                            ? <Link to="/admin" className="nav-link">Admin</Link>
                            : <AdminNav />
                        }
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigator;