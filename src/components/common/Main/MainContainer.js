import React from 'react';
import Row from 'react-bootstrap/Row';

const MainContainer = ({ children }) => {
    return (
        <div className="container-fluid">
            <Row className="flex-xl-nowrap">
                { children }
            </Row>
        </div>
    );
};

export default MainContainer;