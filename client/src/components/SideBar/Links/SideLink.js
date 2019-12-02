import React from 'react';
import { Link } from 'react-router-dom';

const SideLink = ({ to, display, className }) => (
    <Link
        className={`nav-link pointer ${className ? className : ''}`}
        to={to}
    >
        { display }
    </Link>
);

export default SideLink;