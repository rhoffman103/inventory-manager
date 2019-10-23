import React from 'react';
import NavLink from 'react-bootstrap/NavLink';
import Accordion from 'react-bootstrap/Accordion'
import AccordionCollapse from '../AccordionComponents/AccordionCollapse';
import SideBar from '../SideBar';
import SideLink from '../Links/SideLink';
import Schedule from './Links/Schedule';

const ProductionSidebar = (props) => {
    return (
        <SideBar>
            
            <Accordion>
                <Accordion.Toggle as={NavLink} eventKey="px">
                    <h5>PX</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="px">
                    <Schedule {...props} />
                    <SideLink to='/production/px/add-new-rolls' display='Add New Rolls' />
                    <SideLink to='/production/px/report-scrap' display='Scrap' />
                    <SideLink to='/production/px/report-downtime' display='Downtime' />
                </AccordionCollapse>
            </Accordion>
            
            <Accordion>
                <Accordion.Toggle as={NavLink} eventKey="packaging">
                    <h5>Packaging</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="packaging">
                    <SideLink to='/production/add-new-pallet' display='Add New Pallet' />
                </AccordionCollapse>
            </Accordion>

        </SideBar>
    );
};

export default ProductionSidebar;