import React from 'react';
import SidebarLink from './SidebarLink';

const Employees = () => (
    <SidebarLink
        page='adminPage'
        title='Create New Product'
        component='newProduct'
    >
        Create New Product
    </SidebarLink>
);

export default Employees;