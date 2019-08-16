import React from 'react';
import NavProvider from '../../contextProvider/NavProvider';
import Navigator from './Navigator';

const NavBar = (props) => (
    <NavProvider>
        <Navigator {...props} />
    </NavProvider>
);

export default NavBar;