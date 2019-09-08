import React from 'react';
import SidebarLink from './SidebarLink';
import useHandleComponents from '../../../hooks/useHandleComponents';

const Employees = () => {

    const { handleOneVisibleComponent } = useHandleComponents();

    const handleClick = () => handleOneVisibleComponent({ page: 'adminPage', title: 'Create New Product', component: 'newProduct', mount: true });

    return (
        <SidebarLink
            handleClick={handleClick}
        >
            Create New Product
        </SidebarLink>
    );
};

export default Employees;