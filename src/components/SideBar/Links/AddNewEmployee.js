import React from 'react';
import useHandleComponents from '../../../hooks/useHandleComponents';

const AddNewEmployee = () => {

    const { handleOneVisibleComponent } = useHandleComponents();

    const handleClick = () => handleOneVisibleComponent({ page: 'adminPage', component: 'addNewEmployee', mount: true });

    return (
        <span
            className="nav-link pointer"
            onClick={handleClick}
        >
            Add New Employee
        </span>
    );
};

export default AddNewEmployee;