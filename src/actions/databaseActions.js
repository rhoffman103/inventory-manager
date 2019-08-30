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
                type: 'PROMOTE_ADMIN_COMPLETE',
                showSpinner: false,
                isModal: true,
                updateEmployee: { 
                    ...employee,
                    message: `${employee.displayName} now has Admin permissions.`
                }
            });
            return Promise.resolve(employee);
        })
        .catch(err => {
            stateDispatch({
                type: 'PROMOTE_ADMIN_COMPLETE',
                showSpinner: false,
                isModal: true,
                updateEmployee: {
                    ...employee,
                    err: err.message
                }
            });
        });
};