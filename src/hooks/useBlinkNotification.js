import { useContext, useState, useEffect } from 'react';
import appContext from '../context/appContext';

const useBlinkNotification = (location) => {
    const { state } = useContext(appContext);
    const { nonViewedScheduleUpdate } = state.components;
    const [notificationClasses, setNotificationClasses] = useState('');

    useEffect(() => {
        if (nonViewedScheduleUpdate && !location.pathname.includes('schedule')) {
            setNotificationClasses('orange-1 flash-notification');
        }
        else setNotificationClasses('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nonViewedScheduleUpdate]);

    return { notificationClasses, setNotificationClasses };
};

export default useBlinkNotification;