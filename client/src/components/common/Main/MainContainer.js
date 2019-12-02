import React from 'react';
import Row from 'react-bootstrap/Row';

const MainContainer = ({ children }) => {
    const position = {
        top: '5rem'
    }
    return (
        <div style={position} className="container-fluid top-45">
            <Row className="flex-xl-nowrap">
                { children }
            </Row>
        </div>
    );
};

export default MainContainer;