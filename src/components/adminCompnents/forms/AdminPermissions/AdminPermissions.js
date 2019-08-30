import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import CheckboxToggle from './CheckboxToggle';
import AdminForm from './AdminForm';

const AdminPermissions = ({ name, id }) => (
    <Accordion>
        <CheckboxToggle eventKey={id} />
        <Accordion.Collapse eventKey={id}>
            <AdminForm
                id={id} 
                name={name}
            />
        </Accordion.Collapse>
    </Accordion>
);

export default AdminPermissions;