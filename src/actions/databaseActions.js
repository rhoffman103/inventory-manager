import database, { firebase } from '../config/firebaseConfig';
import moment from 'moment';

const formRequestDispatch = (formRequest) => ({
    type: 'FORM_REQUEST_COMPLETE',
    showSpinner: false,
    formRequest,
    isModal: true
});

export const getEmployeesByPermission = () => {
    return database.collection('employees').where('admin', '==', false).get()
        .then(querySnapshot => {
            let employeeArray = []
            querySnapshot.forEach(employee => {
                employeeArray.push({ ...employee.data(), dbId: employee.id })
            });
            return Promise.resolve({ employees: employeeArray});
        })
        .catch(err => console.log("Error getting documents: ", err));
};

export const updateAdminStatus = (stateDispatch, employee) => {
    stateDispatch({
        type: 'SET_MODAL_SPINNER',
        showSpinner: true
    });

    return database.collection('employees').doc(employee.dbId)
        .update({ admin: true })
        .then(() => {
            stateDispatch({
                type: 'FORM_REQUEST_COMPLETE',
                showSpinner: false,
                formRequest: { 
                    ...employee,
                    message: `${employee.displayName} now has Admin permissions.`
                },
                isModal: true
            });
            return Promise.resolve(employee);
        })
        .catch(err => {
            stateDispatch({
                type: 'FORM_REQUEST_COMPLETE',
                showSpinner: false,
                formRequest: {
                    ...employee,
                    err: err.message
                },
                isModal: true
            });
        });
};

export const addNewProduct = (product, dispatch) => {
    dispatch({
        type: 'SET_MODAL_SPINNER',
        showSpinner: true
    });

    return database.collection('products').where('id', '==', product.id).get()
    .then(querySnapshot => {
        let idExists = false;
            querySnapshot.forEach(doc => {
                if (doc.exists) {
                    idExists = true;
                    return false;
                }
            })
            if (idExists) {
                return Promise.reject({
                    code: 'Product ID exists',
                    message: `Product ID: ${product.id} already exists!`
                });
            }
            else return Promise.resolve();
    })
    .then(() => database.collection('products').add(product))
    .then(() => {
        dispatch({
            type: 'FORM_REQUEST_COMPLETE',
            showSpinner: false,
            formRequest: {
                code: 'Add Product Success',
                message: `Successfully added product ID: ${product.id}`
            },
            isModal: true
        });
        return Promise.resolve();
    })
    .catch((err) => {
        const { code, message } = err;
        dispatch({
            type: 'FORM_REQUEST_COMPLETE',
            showSpinner: false,
            formRequest: { code, err: message },
            isModal: true
        });
        return Promise.reject({ code, message });
    });
};

export const getProductsByType = (productType, dispatch) => {
    return database.collection('products').where('type', '==', productType).get()
    .then(querySnapshot => {
        let products = []
        querySnapshot.forEach(doc => {
            products.push({
                ...doc.data(),
                key: doc.id
            })
        });
        dispatch({
            type: 'SET_PRODUCTS_LIST',
            products
        })
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
    dispatch({
        type: 'SET_MODAL_SPINNER',
        showSpinner: true
    });
    
    const jacketControlRef = database.collection('control').doc('jobJackets')
    const increment = firebase.firestore.FieldValue.increment(1);
    let jacketId = '';

    return jacketControlRef.update({ count: increment })
    .then(() => jacketControlRef.get())
    .then(doc => {
        if (doc.exists) return Promise.resolve(doc.data());
        else return Promise.reject({
            code: 'No Document',
            message: 'No such document!'
        });
    })
    .then(data => {
        let jacketNum = [jobJacket.productionLine];
        const count = data.count.toString();

        for (let i = 0; i < 6 - count.length; i++) jacketNum.push('0');
        jacketId = jacketNum.join('') + count
        
        return database.collection('jobJackets').add({
            ...jobJacket,
            complete: false,
            dueDate: moment(jobJacket.dueDate, 'MM-DD-YYYY').format('x'),
            id: jacketId
        });
    })
    .then(() => {
        dispatch(formRequestDispatch({
            code: 'Add Job Jacket Success',
            message: `Successfully added Job Jacket ${jacketId} for ${jobJacket.customer}`
        }));
        return Promise.resolve({ jobJacket: jacketId });
    })
    .catch(err => {
        dispatch(formRequestDispatch(err));
        return Promise.reject(err);
    });
};
