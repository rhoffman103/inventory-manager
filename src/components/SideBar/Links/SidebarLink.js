import React from 'react';
import useHandleComponents from '../../../hooks/useHandleComponents';

const SidebarLink = ({ children, title, page, component }) => {

    const { handleOneVisibleComponent } = useHandleComponents();

    const handleClick = () => handleOneVisibleComponent({
        mount: true,
        page,
        title,
        component
    });

    return (
        <span
            className="nav-link pointer"
            onClick={handleClick}
        >
            { children }
        </span>
    );
};

export default SidebarLink;