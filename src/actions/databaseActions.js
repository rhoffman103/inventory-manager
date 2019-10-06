import { setAdminStatus } from '../database/employeesAccess';
import dbProducts from '../database/productsAccess';
import dbJobJackets from '../database/jobJacketAccess';
import dbSchedule from '../database/scheduleAccess';
import { modalSpinner, formRequestAction } from './commonActions';

const genericDbError = {
    data: {
        code: 'db error',
        err: 'Something went wrong fetching data'
    }
};

export const updateAdminStatus = (stateDispatch, employee) => {
    stateDispatch(modalSpinner());

    return setAdminStatus(employee.dbId, true)
        .then(() => {
            stateDispatch(formRequestAction({
                data: { message: `${employee.displayName} now has Admin permissions.` },
                employee
            }));
            return Promise.resolve(employee);
        })
        .catch(err => {
            stateDispatch(formRequestAction({
                data: { err: err.message, code: err.code },
                employee
            }));
        });
};

export const addNewProduct = (product, dispatch) => {
    dispatch(modalSpinner());

    return dbProducts.addNewProduct(product)
    .then(() => {
        dispatch(formRequestAction({
            data: {
                code: 'Add Product Success',
                message: `Successfully added product ID: ${product.id}`
            }
        }));
        return Promise.resolve();
    })
    .catch((err) => {
        const { code, message } = err;
        dispatch(formRequestAction({
            data: { code, err: message }
        }));
        return Promise.reject({ code, message });
    });
};

export const getProductsByType = (productType, dispatch) => {
    return dbProducts.getProductsByType(productType)
    .then(products => {
        dispatch({
            type: 'SET_PRODUCTS_LIST',
            products
        });
    })
    .catch(err => {
        const { code, message } = err;
        dispatch({
            type: 'SET_PRODUCTS_LIST_ERROR',
            productsListErr: { code, err: message }
        });
    });
};

export const addNewJobJacket = (jobJacket, dispatch) => {
    dispatch(modalSpinner());

    return dbJobJackets.addNewJobJacket(jobJacket)
    .then((jacketId) => {
        dispatch(formRequestAction({
            data: {
                code: 'Add Job Jacket Success',
                message: `Successfully added Job Jacket ${jacketId} for ${jobJacket.customer}`
            }
        }));
        return Promise.resolve({ jobJacket: jacketId });
    })
    .catch(err => {
        dispatch(formRequestAction(err));
        return Promise.reject(err);
    });
};

export const getJobJacketsByProductionLine = ({ line, isCompleted = false, inSchedule = false }, dispatch) => {
    dispatch(modalSpinner());

    let property = 'jobJackets';
    inSchedule && (property = 'schedule');

    return dbJobJackets.getJobJacketsByProductionLine({line, inSchedule})
    .then(data => {
        data 
        ?   dispatch({
                type: 'JOB_JACKETS',
                key: property,
                value: data.jobJackets
            })
        :   dispatch({ type: 'CLOSE_MODAL' })
    })
    .catch(err => dispatch(formRequestAction({ data: { ...err }})))
};

export const getScheduleByLine = (line, dispatch) => {
    dispatch(modalSpinner());

    return dbSchedule.getScheduleByLine(line)
    .then(data => {
        data 
        ?   dispatch({
                type: 'JOB_JACKETS',
                key: 'schedule',
                value: data.shedule
            })
        :   dispatch({ type: 'CLOSE_MODAL' })
    })
    .catch(err => dispatch(formRequestAction({ data: { ...err }})))
};

export const getJacketsAndScheduleByLine = (line, dispatch) => {
    dispatch(modalSpinner());
    let db = {
        jobJackets: []
    };
    
    return dbSchedule.getScheduleByLine(line)
    .then(data => {
        if (data) db.jobJackets = data.jobJackets.map(job => job);
        else Promise.reject(genericDbError);
        return dbJobJackets.getJobJacketsByProductionLine({ line })
    })
    .then(data => {
        if (data) {
            db.jobJackets.push(
                ...data.jobJackets.map(jacket => ({
                    ...jacket,
                    jobJacketKey: jacket.dbId,
                    position: undefined
                }))
            );
        }
        else Promise.resolve();

        dispatch({
            type: 'SCHEDULE_RETRIEVED',
            db
        });

        return Promise.resolve();
    })
    .catch(err => dispatch(formRequestAction(err)))
};

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
        position: inScheduleLength ? (inScheduleLength + 1) : 0
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
        if ((jobJacket.id !== jacket.id) && (!jacket.inSchedule)) {
            if (jobJacket.id === jacket.id) console.log(jobJacket.customer)
            return { ...jacket, inSchedule: false, position: undefined };
        }
        else if (jobJacket.id === jacket.id) {
            removedJob = { ...jacket, inSchedule: false, position: undefined };
        }
        else {
            newPosition++;
            scheduleArray.push({ ...jacket, position: newPosition });
            return false;
        }
    });

    newJobJacketsArray.push(removedJob);
    newJobJacketsArray.push(...scheduleArray);

    console.log('NEW SCHEDULE: ', newJobJacketsArray);
    
    dispatch({
        type: 'SCHEDULE_UPDATE',
        jobJackets: newJobJacketsArray
    });
};

export const updateScheduleAndJobJackets = (stateDb, line, dispatch) => {
    dispatch(modalSpinner());

    const nonScheduledJackets = [];
    const inScheduleJackets = stateDb.jobJackets.filter(job => {
        if (job.inSchedule === true) return job;
        else nonScheduledJackets.push(job);
    });
    const schedule = stateDb.schedule.map(job => {
        delete job.id;
        return job;
    });

    return dbSchedule.updateScheduleOrder({ schedule, line })
    .then(() => dbJobJackets.updateJobJackets({
        jobJackets: inScheduleJackets,
        updateObj: { inSchedule: true }
    }))
    .then(() => dbJobJackets.updateJobJackets({
        jobJackets: nonScheduledJackets,
        updateObj: { inSchedule: false }
    }))
    .then(() => getJacketsAndScheduleByLine(line, dispatch))
    .then(() => dispatch(formRequestAction({
        data: { 
            code: 'Schedule Update',
            message: 'Succesfully Updated Schedule'
        }
    })))
    .catch((err) => {
        console.log(err);
        dispatch(formRequestAction({ data: { code: err.code, err: err.message  }}))
    });
};