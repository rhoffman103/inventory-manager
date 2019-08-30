import React from 'react';
import useHandleComponents from '../../../hooks/useHandleComponents';

const Employees = () => {

    const { handleOneVisibleComponent } = useHandleComponents();

    const handleClick = () => handleOneVisibleComponent({ page: 'adminPage', title: 'Employees & Permissions', component: 'employees', mount: true });

    return (
        <span
            className="nav-link pointer"
            onClick={handleClick}
        >
            Employees / Permissions
        </span>
    );
};

export default Employees;