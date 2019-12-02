import React from 'react';
import * as BootCollapse from 'react-bootstrap/AccordionCollapse';

const AccordionCollapse = ({ eventKey, children }) => (
    <BootCollapse eventKey={eventKey}>
        <div className="border-top border-bottom border-light">
            { children }
        </div>
    </BootCollapse>
);

export default AccordionCollapse;