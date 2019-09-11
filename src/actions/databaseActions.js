import database from '../config/firebaseConfig';

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
        stateUpdate: {
            showSpinner: true
        }
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
        stateUpdate: {
            showSpinner: true
        }
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