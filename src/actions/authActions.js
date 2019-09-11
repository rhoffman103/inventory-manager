import database, { firebase, secondaryApp } from '../config/firebaseConfig';

const loginUser = (dispatch, user) => {
    dispatch({
        type: 'LOGIN_USER',
        stateUpdate: {
            auth: {
                ...user,
                name: user.displayName,
            },
            onFirebaseAuth: true,
            isModal: false
        }
    });
};

const exit = (dispatch) => {
    dispatch({
        type: 'SIGNOUT',
        stateUpdate: {
            auth: {},
            onFirebaseAuth: true
        }
    });
};

export const signIn = (user, dispatch) => {
    const { email, password } = user;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((ref) => {
            return database.collection('employees').doc(ref.user.uid).get()
        })
        .then(doc => {
            loginUser(dispatch, { ...doc.data(), uid: doc.id });
        })
        .catch((err) => {
            const { code, message } = err;
            dispatch({
                type: 'LOGIN_ERROR',
                stateUpdate: { 
                    loginError: { code, message }
                }
            });
        });
};

export const resetLoginError = (dispatch) => {
    dispatch({
        type: 'RESET_LOGIN_ERROR',
        stateUpdate: { loginError: false }
    });
};

export const signOut = (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
        dispatch({
            type: 'SIGNOUT',
            stateUpdate: {
                auth: {}
            }
        });
    });
};

export const getUser = (dispatch) => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) return resolve(user);
            else return reject();
        })
    })
    .then(user => {
        return database.collection('employees').doc(user.uid).get()
    })
    .then((doc) => {
        doc.exists
            ? loginUser(dispatch, { ...doc.data(), uid: doc.id })
            : exit(dispatch)
    })
    .catch(() => exit(dispatch));
};

export const addNewEmployee = (newEmployee, state, dispatch) => {
    let newUID = null;
    const user = {
        firstName: newEmployee.firstName.trim(),
        lastName: newEmployee.lastName.trim(),
        displayName: `${newEmployee.firstName.trim()} ${newEmployee.lastName.trim()}`,
        employeeId: newEmployee.employeeId,
        email: newEmployee.email.trim(),
        admin: false
    };

    dispatch({
        type: 'SET_MODAL_SPINNER',
        stateUpdate: {
            showSpinner: true
        }
    });
    
    return database.collection('employees').where('employeeId', '==', newEmployee.employeeId).get()
        .then((querySnapshot) => {
            let idExists = false;
            querySnapshot.forEach(doc => {
                if (doc.exists) {
                    idExists = true;
                    return false;
                }
            })
            if (idExists) {
                return Promise.reject({
                    code: 'Employee ID exists',
                    message: `Employee ID: ${newEmployee.employeeId} already exists`
                });
            }
            else return Promise.resolve();
        })
        .then(() => secondaryApp.auth().createUserWithEmailAndPassword(newEmployee.email, newEmployee.password))
        .then((res) => {
            newUID = res.user.uid;

            return secondaryApp.auth().currentUser.updateProfile({
                displayName: user.displayName
            });
        })
        .then(() => {
            secondaryApp.auth().signOut();
            
            return database.collection('employees').doc(newUID).set(user);
        })
        .then(() => {
            let newEmployees = [];

            if (state.newEmployees) newEmployees = Object.keys(state.newEmployees).map((employee) => state.newEmployees[employee]);

            newEmployees.push({ employee: user.displayName, id: newEmployee.employeeId, uid: newUID });

            dispatch({
                type: 'ADD_NEW_EMPLOYEE_COMPLETE',
                newEmployees,
                showSpinner: false,
                emptyCurrentForm: true,
                addNewEmployeeError: false,
                formRequest: {
                    message: `Added new employee: ${user.displayName}`
                }
            });
            return Promise.resolve({ employee: user.displayName, id: newEmployee.employeeId, uid: newUID })
        })
        .catch((err) => {
            const { code, message } = err;
            console.log(err);
            dispatch({
                type: 'ADD_NEW_EMPLOYEE_COMPLETE',
                showSpinner: false,
                addNewEmployeeError: { code, message },
                formRequest: {
                    err: message 
                }
            });
            return Promise.reject({ code, message });
        });
};