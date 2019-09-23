import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ component, children }) => (
    <Link
        className="nav-link pointer"
        to={`/admin/${component}`}
    >
        { children }
    </Link>
);

export default SidebarLink;