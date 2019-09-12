import React from 'react';
import SidebarLink from './SidebarLink';

const Employees = () => (
    <SidebarLink
        page='adminPage'
        title='Employees & permissions'
        component='employees'
    >
        Employees / Permissions
    </SidebarLink>
);

export default Employees;