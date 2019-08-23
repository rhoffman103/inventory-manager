import React from 'react';
import Col from 'react-bootstrap/Col';

const Main = ({ children, useColSpacer }) => {
    return (
        <>
            { !useColSpacer && <div className="col-12 col-md-3 col-xl-2 m-0 p-0"></div> }
            <Col xs={12} md={9} xl={8} className="p-0 px-3">
                { children }
            </Col>
        </>
    );
};

export default Main;