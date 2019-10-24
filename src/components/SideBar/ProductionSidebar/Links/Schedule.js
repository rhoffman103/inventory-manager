import React from 'react';
import useBlinkNotification from '../../../../hooks/useBlinkNotification';
import SideLink from '../../Links/SideLink';

const Schedule = ({ location, productionLine }) => {
    const { notificationClasses } = useBlinkNotification(location);

    return (
        <SideLink
            className={
                location.pathname.toLowerCase().includes(`/production/${productionLine}`)
                    ? notificationClasses
                    : ''
            }
            to={`/production/${productionLine}/schedule`}
            display='Schedule'
        />
    );
};

export default Schedule;