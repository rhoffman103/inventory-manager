import dbSchedule from '../database/scheduleAccess';

export const addToSchedule = (jobJacket, stateDb, dispatch) => {
    let changedJackets = Object.assign({}, stateDb.changedJackets) || {};
    let schedule = Array.from(stateDb.schedule);
    const newJobJacketsArray = stateDb.jobJackets.filter(jacket => {
        if (jobJacket.id !== jacket.id) {
            return jacket;
        }
        else {
            const key = jacket.jobJacketKey
            if (stateDb.originalJacketScheduleState[key] === false) {
                changedJackets[key] = { inSchedule: true }
            }
            else delete changedJackets[jacket.jobJacketKey];

            schedule.push({
                ...jobJacket,
                inSchedule: true,
                position: (schedule.length + 1)
            });
            return false;
        }
    });

    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets: newJobJacketsArray,
        schedule,
        changedJackets
    });
};

export const removeFromSchedule = (jobJacket, stateDb, dispatch) => {
    let newPosition = 0;
    let schedule = [];
    let changedJackets = Object.assign({}, stateDb.changedJackets) || {};
    let jobJackets = Array.from(stateDb.jobJackets);
    
    stateDb.schedule.forEach(jacket => {
        if (jobJacket.id === jacket.id) {
            jobJackets.push({ ...jacket, inSchedule: false, position: undefined });
            
            if (stateDb.originalJacketScheduleState[jacket.jobJacketKey] === true)
                changedJackets[jacket.jobJacketKey] = { inSchedule: false, scheduleKey: jacket.scheduleKey };
            else delete changedJackets[jacket.jobJacketKey];
        }
        else {
            newPosition++;
            schedule.push({ ...jacket, position: newPosition });
        }
    });
    
    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets,
        schedule,
        changedJackets
    });
};

export const ScheduleByLineListener = (line, dispatch) => {
    dispatch({
        type: 'SET_LOADING_WHEEL',
        showLoadingWheel: true
    })
    return dbSchedule.listenForScheduleByLine(line, (data) => {
        if (data.err) {
            dispatch({
                type: 'SCHEDULE_LISTENER_ERROR',
                err: data
            })
        }
        else {
            dispatch({
                type: 'SCHEDULE_LISTENER',
                schedule: data.schedule
            })
        }
    });
};