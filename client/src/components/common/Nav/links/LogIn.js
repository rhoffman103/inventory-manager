import React from 'react';
import useModal from '../../../../hooks/useModal';

const LogIn = () => {
    const { showModal } = useModal();
    return (
        <span
        className="nav-link pointer"
        onClick={() => showModal('login')}
    >
        login
    </span>
    );
};

export default LogIn;