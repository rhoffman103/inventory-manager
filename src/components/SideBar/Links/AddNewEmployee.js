import React from 'react';
import SidebarLink from './SidebarLink';

const AddNewEmployee = () => (
    <SidebarLink
        page='adminPage'
        title='Add New Employee'
        component='addNewEmployee'
    >
        Add New Employee
    </SidebarLink>
);

export default AddNewEmployee;