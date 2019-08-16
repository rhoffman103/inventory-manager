import React from 'react';
import useModal from '../../../../hooks/useModal';

const AddNewEmployee = () => {

    const { showModal } = useModal();

    return (
        <span
            className="nav-link pointer"
            onClick={showModal}
        >
            Add New Employee
        </span>
    );
};

export default AddNewEmployee;