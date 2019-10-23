import React, { useContext, useEffect, useState } from 'react';
import appContext from '../../../../context/appContext';
import SideLink from '../../Links/SideLink';

const Schedule = ({ location }) => {
    const { state } = useContext(appContext);
    const { nonViewedScheduleUpdate } = state.components;
    const [classes, setClasses] = useState('');

    useEffect(() => {
        if (nonViewedScheduleUpdate && !location.pathname.includes('schedule'))
            setClasses('orange-1 flash-notification');
        else setClasses('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nonViewedScheduleUpdate]);

    return (
        <SideLink
            className={classes}
            to='/production/px/schedule'
            display='Schedule'
        />
    );
};

export default Schedule;