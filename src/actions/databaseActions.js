import { setAdminStatus } from '../database/employeesAccess';
import dbProducts from '../database/productsAccess';
import dbJobJackets from '../database/jobJacketAccess';
import { modalSpinner, formRequestAction } from './commonActions';

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
