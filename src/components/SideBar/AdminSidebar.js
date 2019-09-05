import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion'
import SideBar from './SideBar';
import AddNewEmployee from './Links/AddNewEmployee';
import Employees from './Links/Employees';
import CreateNewProduct from './Links/CreateNewProduct';

const AdminSidebar = () => {
    return (
        <SideBar>
            <Accordion>
                <Accordion.Toggle as={Nav.Link} eventKey="employees">
                    Employees
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="employees">
                    <div className="border-top border-bottom border-light">
                        <Employees />
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
                        <CreateNewProduct />
                        <Nav.Link>Update Product</Nav.Link>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        </SideBar>
    );
};

export default AdminSidebar;