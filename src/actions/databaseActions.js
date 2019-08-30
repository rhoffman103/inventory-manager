import database from '../config/firebaseConfig';

export const getEmployeesByPermission = () => {
    return database.collection('employees').where('admin', '==', false).get()
        .then(querySnapshot => {
            let employeeArray = []
            querySnapshot.forEach(employee => {
                employeeArray.push(employee.data())
            });
            return Promise.resolve({ employees: employeeArray});
        })
        .catch(err => console.log("Error getting documents: ", err));
};