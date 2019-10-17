import React from 'react';
import { Link } from 'react-router-dom';

const SideLink = ({ to, display }) => (
    <Link
        className="nav-link pointer"
        to={to}
    >
        { display }
    </Link>
);

export default SideLink;