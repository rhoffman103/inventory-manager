export const addToSchedule = (jobJacket, stateDb, dispatch) => {
    const schedule = Array.from(stateDb.schedule);
    const newJobJacketsArray = stateDb.jobJackets.filter(jacket => {
        if (jobJacket.id !== jacket.id) return jacket
        else {
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
        schedule
    });
};

export const removeFromSchedule = (jobJacket, stateDb, dispatch) => {
    let newPosition = 0;
    let schedule = [];
    let jobJackets = Array.from(stateDb.jobJackets);
    
    stateDb.schedule.forEach(jacket => {
        if (jobJacket.id === jacket.id) {
            jobJackets.push({ ...jacket, inSchedule: false, position: undefined, });
        }
        else {
            newPosition++;
            schedule.push({ ...jacket, position: newPosition });
        }
    });
    
    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets,
        schedule
    });
};