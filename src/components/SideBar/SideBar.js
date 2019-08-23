import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const SideBar = ({ children }) => {

    return (
        <div className="sidebar col-12 col-md-3 col-xl-2 m-0 p-0 bg-dark overflow-auto">
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Toggle aria-controls="basic-sidebar" />
                <Navbar.Collapse id="basic-sidebar">
                    <Nav className="mr-auto flex-column height-100">
                        { children }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default SideBar;