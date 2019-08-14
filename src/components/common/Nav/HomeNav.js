import React from 'react';
import useModal from '../../../hooks/useModal';

const HomeNav = () => {
    const { showModal } = useModal();

    return (
        <>
            <span
                className="nav-link pointer"
                onClick={showModal}
            >
                Login
            </span>
            {/* <Link to="/admin" className="nav-link">Admin</Link> */}
        </>
    );
};

export default HomeNav;