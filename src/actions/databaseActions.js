import { setAdminStatus } from '../database/employeesAccess';
import dbProducts from '../database/productsAccess';
import dbJobJackets from '../database/jobJacketAccess';
import dbSchedule from '../database/scheduleAccess';
import { modalSpinner, formRequestAction } from './commonActions';

export const updateAdminStatus = (stateDispatch, employee) => {
    stateDispatch(modalSpinner());

    return setAdminStatus(employee.scheduleKey, true)
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
    let originalJacketScheduleState = {};
    let db = {
        jobJackets: [],
        schedule: []
    };

    const assignScheduleState = (arr, obj) => {
        arr.forEach(jacket => obj[jacket.jobJacketKey] = jacket.inSchedule)
    };
    
    return dbSchedule.getScheduleByLine(line)
    .then(data => {
        if (data) {
            db.schedule = data.schedule.map(job => job);
            assignScheduleState(db.schedule, originalJacketScheduleState);
        }
        return dbJobJackets.getJobJacketsByProductionLine({ line, isCompleted: false, inSchedule: false })
    })
    .then(data => {
        if (data) {
            db.jobJackets = data.jobJackets.map(jacket => ({
                ...jacket,
                jobJacketKey: jacket.jobJacketKey,
                position: undefined
            }));
            assignScheduleState(db.jobJackets, originalJacketScheduleState);
        }
        else Promise.resolve();

        dispatch({
            type: 'SCHEDULE_RETRIEVED',
            originalJacketScheduleState,
            db
        });

        return Promise.resolve();
    })
    .catch(err => dispatch(formRequestAction(err)))
};

export const updateScheduleAndJobJackets = (stateDb, line, dispatch) => {
    dispatch(modalSpinner());

    let { schedule, changedJackets } = stateDb;
    let removedKeys = [];
    let jacketUpdates = []; 
    
    if(changedJackets) {
        jacketUpdates = Object.keys(changedJackets).map(key => {
            const jacket = changedJackets[key];
            if (!jacket.inSchedule) removedKeys.push(jacket.scheduleKey);
            return {
                jobJacketKey: key,
                updateObj: { inSchedule: jacket.inSchedule }
            };
        });
    }

    return dbSchedule.updateScheduleOrder({ schedule, removedKeys, line })
    .then(() => dbJobJackets.updateJobJackets(jacketUpdates))
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

export const getDummySchedule = (dispatch) => {
    let originalJacketScheduleState = {};
    const db = {
        jobJackets: [
            {
                complete: false,
                coreDiameter: "654",
                customer: "dunder mifflin",
                description: "Oyster 6.5 x 62\" TPO",
                dueDate: "1571630400000",
                id: "PX000001",
                inSchedule: false,
                jobJacketKey: "cq1upub2v0MFRcc0mrZq",
                position: undefined,
                productKey: "a278FLLU6NMHXZEt8tnU",
                productionLine: "PX",
                purchaseOrder: "654",
                rollLength: "654",
                totalMSF: "654",
                totalRolls: "654"
            }, {
                complete: false,
                coreDiameter: "3",
                customer: "testy",
                description: "BLK / RED 4.0 x 37\"",
                dueDate: "1571112000000",
                id: "PX000004",
                inSchedule: false,
                jobJacketKey: "oPveq7FzRDWy0H9h5SUV",
                position: undefined,
                productKey: "m9Z9doImVaVusANMh8C1",
                productionLine: "PX",
                purchaseOrder: "789456",
                rollLength: "40000",
                totalMSF: "40000",
                totalRolls: "26"
            }
        ],
        schedule: [
            {
                complete: false,
                coreDiameter: "3",
                customer: "Tiki Liki",
                description: "BLK 3.0 x 37\" Fric",
                dueDate: "1572321600000",
                id: "PX000007",
                inSchedule: true,
                jobJacketKey: "fF5A2vUdwo6iF7L7ok06",
                position: 1,
                productKey: "9PvYRNwfKO5p1JTf7qdj",
                productionLine: "PX",
                purchaseOrder: "654321",
                rollLength: "70000",
                scheduleKey: "hfz3HW3plQBFJKcefm5F",
                totalMSF: "100000",
                totalRolls: "26"
            }, {
                complete: false,
                coreDiameter: "6",
                customer: "Mike FearMe",
                description: "BLK / RED 4.0 x 37\"",
                dueDate: "1572753600000",
                id: "PX000006",
                inSchedule: true,
                jobJacketKey: "zNC5fypRGKEJMsIwIpov",
                position: 2,
                productKey: "m9Z9doImVaVusANMh8C1",
                productionLine: "PX",
                purchaseOrder: "123456",
                rollLength: "321321",
                scheduleKey: "FA9IsY8poR2ZfWX7aogB",
                totalMSF: "321321",
                totalRolls: "32"
            }
        ]
    };

    const assignScheduleState = (arr, obj) => {
        arr.forEach(jacket => obj[jacket.jobJacketKey] = jacket.inSchedule)
    }
    
    assignScheduleState(db.jobJackets, originalJacketScheduleState);
    assignScheduleState(db.schedule, originalJacketScheduleState);
    
    dispatch({
        type: 'SCHEDULE_RETRIEVED',
        originalJacketScheduleState,
        db
    });
}