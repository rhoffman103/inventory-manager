import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion'
import SideBar from './SideBar';
import AddNewEmployee from './Links/AddNewEmployee';

const AdminSidebar = () => {
    return (
        <SideBar>
            <Accordion>
                <Accordion.Toggle as={Nav.Link} eventKey="employees">
                    Employees
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="employees">
                    <div className="border-top border-bottom border-light">
                        <Nav.Link>View Employees</Nav.Link>
                        <Nav.Link>Employee Permissions</Nav.Link>
                        <AddNewEmployee />
                    </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Nav.Link} eventKey="Scheduling">
                    Scheduling
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="Scheduling">
                    <div className="border-top border-bottom border-light">
                        <Nav.Link>Update Schedule</Nav.Link>
                        <Nav.Link>Add New Job Jacket</Nav.Link>
                    </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Nav.Link} eventKey="Products">
                    Products
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="Products">
                    <div className="border-top border-bottom border-light">
                        <Nav.Link>Create New Product</Nav.Link>
                        <Nav.Link>Update Product</Nav.Link>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </SideBar>
    );
};

export default AdminSidebar;