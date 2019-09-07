import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import Accordion from 'react-bootstrap/Accordion'
import AccordionCollapse from '../AccordionComponents/AccordionCollapse';
import SideBar from '../SideBar';
import AddNewEmployee from '../Links/AddNewEmployee';
import Employees from '../Links/Employees';
import CreateNewProduct from '../Links/CreateNewProduct';

const AdminSidebar = () => {
    return (
        <SideBar>
            
            <Accordion>
                <Accordion.Toggle as={NavLink} eventKey="employees">
                    <h5>Employees</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="employees">
                    <Employees />
                    <AddNewEmployee />
                </AccordionCollapse>
            </Accordion>
            
            <Accordion>
                <Accordion.Toggle as={NavLink} eventKey="Scheduling">
                    <h5>Scheduling</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="Scheduling">
                    <NavLink>Update Schedule</NavLink>
                    <NavLink>Add New Job Jacket</NavLink>
                </AccordionCollapse>
            </Accordion>
            
            <Accordion>
                <Accordion.Toggle as={NavLink} eventKey="Products">
                    <h5>Products</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="Products">
                    <CreateNewProduct />
                    <NavLink>Update Product</NavLink>
                </AccordionCollapse>
            </Accordion>

        </SideBar>
    );
};

export default AdminSidebar;