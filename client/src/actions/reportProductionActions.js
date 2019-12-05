import dbReportProduction from '../database/reportProductionAccess';
import { modalSpinner, genericModalWithData } from './commonActions';

export const reportScrap = (scrapObj, dispatch) => {
    dispatch(modalSpinner);
    return dbReportProduction.reportScrap(scrapObj)
    .then((data) => {
        dispatch(genericModalWithData({
            message: data.message
        }));
    })
    .catch((err) => genericModalWithData(err))
};

export const reportDowntime = (downtimeObj, dispatch) => {
    dispatch(modalSpinner);
    return dbReportProduction.addDowntime(downtimeObj)
    .then((data) => {
        dispatch(genericModalWithData({
            message: data.message
        }));
    })
    .catch((err) => genericModalWithData(err))
};