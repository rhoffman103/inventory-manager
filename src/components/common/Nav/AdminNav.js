import React from 'react';
import useModal from '../../../hooks/useModal';

const AdminNav = () => {
    const { showModal } = useModal();

    return (
        <>
            <span
                className="nav-link pointer"
                onClick={showModal}
            >
                Make an Account
            </span>
        </>
    );
};

export default AdminNav;