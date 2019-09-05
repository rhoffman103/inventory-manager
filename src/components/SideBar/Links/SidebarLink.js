import React from 'react';

const SidebarLink = ({ handleClick, children }) => (
    <span
        className="nav-link pointer"
        onClick={handleClick}
    >
        { children }
    </span>
);

export default SidebarLink;