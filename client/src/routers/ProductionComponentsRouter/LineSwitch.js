import React, { useContext, useEffect } from 'react';
import appContext from '../../context/appContext';
import { ScheduleByLineListener } from '../../actions/scheduleActions';
// import { getDummySchedule } from '../../actions/databaseActions';
import { Route, Switch } from "react-router-dom";
import Schedule from '../../components/productionComponents/Schedule';
import AddFinishedProduct from '../../components/productionComponents/AddFinishedProduct';
import JobJacketProgress from '../../components/productionComponents/JobJacketProgress';
import ReportScrap from '../../components/productionComponents/ReportScrap';
import ReportDowntime from '../../components/productionComponents/ReportDowntime';
import AddNewPallet from '../../components/common/AddNewPallet';

const LineSwitch = ({ line }) => {
    const { stateDispatch } = useContext(appContext);
    
    useEffect(() => {
        const unsubscribe = ScheduleByLineListener(line, stateDispatch);
        // getDummySchedule(stateDispatch);
        return () => {
            unsubscribe();
            stateDispatch({
                type: 'UNSUBSCRIBE_SCHEDULE_LISTENER'
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Switch>
            <Route
                exact path='/production/px/schedule'
                render={(props) => <Schedule {...props} line='PX' />}
            />
            <Route
                path='/production/px/add-new-rolls/:jacketId?'
                render={(props) => <AddFinishedProduct {...props} line='PX' />}
            />
            <Route
                path='/production/px/progress/:jacketId?'
                render={(props) => <JobJacketProgress {...props} line='PX' />}
            />
            <Route
                path='/production/px/report-scrap/:jacketId?'
                render={(props) => <ReportScrap {...props} line='PX' />}
            />
            <Route
                path='/production/px/report-downtime/:jacketId?'
                render={(props) => <ReportDowntime {...props} line='PX' />}
            />
            <Route
                path='/production/px/add-new-pallet'
                render={(props) => <AddNewPallet />}
            />
        </Switch>
    );
};

export default LineSwitch;