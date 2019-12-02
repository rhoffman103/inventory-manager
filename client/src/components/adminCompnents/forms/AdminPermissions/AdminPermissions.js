import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CheckboxToggle from './CheckboxToggle';
import AdminForm from './AdminForm';

const AdminPermissions = ({ employee }) => (
    <Accordion>
        <CheckboxToggle eventKey={employee.employeeId} />
        <Accordion.Collapse eventKey={employee.employeeId}>
            <AdminForm employee={employee} />
        </Accordion.Collapse>
    </Accordion>
);

export default AdminPermissions;