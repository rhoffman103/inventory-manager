import React from 'react';
import SidebarLink from '../../Links/SidebarLink';

const Employees = () => (
    <SidebarLink
        page='adminPage'
        title='Employees & Permissions'
        component='employeesAndPermissions'
    >
        Employees / Permissions
    </SidebarLink>
);

export default Employees;