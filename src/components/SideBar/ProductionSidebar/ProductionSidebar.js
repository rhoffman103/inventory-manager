import React, { useContext, useState } from 'react';
import appContext from '../../../context/appContext';
import useBlinkNotification from '../../../hooks/useBlinkNotification';
import NavLink from 'react-bootstrap/NavLink';
import Accordion from 'react-bootstrap/Accordion'
import AccordionCollapse from '../AccordionComponents/AccordionCollapse';
import SideBar from '../SideBar';
import SideLink from '../Links/SideLink';
import Schedule from './Links/Schedule';

const ProductionSidebar = (props) => {
    const { state } = useContext(appContext);
    const { subscribedSchedule, nonViewedScheduleUpdate } = state.components;
    const [accordionStatus, setAccordion] = useState({});
    const { notificationClasses, setNotificationClasses } = useBlinkNotification(props.location);

    const toggleAccordion = (accordionKey) => {
        if (accordionStatus[accordionKey]) {
            setAccordion({ ...accordionStatus, [accordionKey]: false });
            if (nonViewedScheduleUpdate) setNotificationClasses('orange-1 flash-notification');
        }
        else {
            setAccordion({ ...accordionStatus, [accordionKey]: true });
            setNotificationClasses('');
        }
    };

    return (
        <SideBar>
            
            <Accordion>
                <Accordion.Toggle
                    as={NavLink}
                    eventKey="px"
                    className={props.location.pathname.toLowerCase().includes('px') ? notificationClasses : ''}
                    onClick={() => toggleAccordion('px')}
                >
                    <h5>PX</h5>
                </Accordion.Toggle>
                <AccordionCollapse eventKey="px">
                    <Schedule {...props} productionLine='px' />
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
                    <SideLink
                        to={subscribedSchedule
                            ? `/production/${subscribedSchedule.toLowerCase()}/add-new-pallet`
                            : '/production/add-new-pallet'
                        }
                        display='Add New Pallet'
                    />
                </AccordionCollapse>
            </Accordion>

        </SideBar>
    );
};

export default ProductionSidebar;