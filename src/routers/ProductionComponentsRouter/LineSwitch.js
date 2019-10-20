import React, { useContext, useEffect } from 'react';
import appContext from '../../context/appContext';
import { Route, Switch } from "react-router-dom";
import Schedule from '../../components/productionComponents/Schedule';
import { ScheduleByLineListener } from '../../actions/scheduleActions';

const LineSwitch = ({ line }) => {
    const { stateDispatch } = useContext(appContext);

    useEffect(() => {
        const unsubscribe = ScheduleByLineListener(line, stateDispatch);
        return () => {
            console.log('UNSUBSCRIBE');
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Switch>
            <Route
                exact path='/production/px/schedule'
                render={(props) => <Schedule {...props} line='PX' />}
            />
        </Switch>
    );
};

export default LineSwitch;