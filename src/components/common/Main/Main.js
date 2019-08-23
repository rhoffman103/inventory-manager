import React from 'react';
import Col from 'react-bootstrap/Col';

const Main = ({ children }) => {
    return (
        <Col xs={12} md={9} xl={8} className="p-0">
            { children }
        </Col>
    );
};

export default Main;