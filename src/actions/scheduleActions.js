export const addToSchedule = (jobJacket, stateDb, dispatch) => {
    let inScheduleLength = 0;
    const newJobJacketsArray = stateDb.jobJackets.filter(jacket => {
        if (jobJacket.id !== jacket.id) {
            if (jacket.inSchedule) inScheduleLength++;
            return jacket;
        }
        else return false;
    });

    newJobJacketsArray.push({
        ...jobJacket,
        inSchedule: true,
        position: inScheduleLength ? (inScheduleLength + 1) : 1
    });

    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets: newJobJacketsArray,
    });
};

export const removeFromSchedule = (jobJacket, stateDb, dispatch) => {
    let newPosition = 0;
    let scheduleArray = [];
    let removedJob = {};
    let newJobJacketsArray = stateDb.jobJackets.filter(jacket => {
        if ((jobJacket.id !== jacket.id) && (!jacket.inSchedule))
            return jacket;
        else if (jobJacket.id === jacket.id) {
            removedJob = { ...jacket, inSchedule: false, position: undefined, };
            return false;
        }
        else {
            newPosition++;
            scheduleArray.push({ ...jacket, position: newPosition });
            return false;
        }
    });

    newJobJacketsArray.push(removedJob);
    newJobJacketsArray.push(...scheduleArray);
    
    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets: newJobJacketsArray
    });
};