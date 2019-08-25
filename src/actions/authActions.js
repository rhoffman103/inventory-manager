import database, { firebase, secondaryApp } from '../config/firebaseConfig';

export const signIn = (user, dispatch) => {
    const { email, password } = user;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((ref) => {
        const { displayName, email, uid } = ref.user
        dispatch({
            type: 'LOGIN_USER',
            stateUpdate: {
                auth: {
                    name: displayName,
                    email,
                    uid
                },
                loginError: false,
                isModal: false
            }
        });
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
                auth: null
            }
        });
    });
};

export const getUser = (dispatch) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const { displayName, email, uid } = user;
            dispatch({
                type: 'LOGIN_USER',
                stateUpdate: {
                    auth: {
                        name: displayName,
                        email,
                        uid
                    },
                    onFirebaseAuth: true
                }
            });
        }
        else {
            dispatch({
                type: 'SIGNOUT',
                stateUpdate: {
                    auth: null,
                    onFirebaseAuth: true
                }
            });
        }
    });
};

export const addNewEmployee = (newEmployee, state, dispatch) => {
    let user = { displayName: `${newEmployee.firstName} ${newEmployee.lastName}`}

    dispatch({
        type: 'SET_MODAL_SPINNER',
        stateUpdate: {
            showSpinner: true
        }
    });
    
    secondaryApp.auth().createUserWithEmailAndPassword(newEmployee.email, newEmployee.password)
        .then((res) => {
            secondaryApp.auth().signOut();
            user.uid = res.user.uid
            
            return database.collection('employees').doc(user.uid).set({
                firstName: newEmployee.firstName,
                lastName: newEmployee.lastName,
                displayName: user.displayName,
                employeeId: newEmployee.employeeId
            });
        })
        .then(() => {
            let newEmployees = [];

            if (state.newEmployees) newEmployees = Object.keys(state.newEmployees).map((employee) => state.newEmployees[employee]);

            newEmployees.push({ employee: user.displayName, id: newEmployee.employeeId, uid: user.uid });

            dispatch({
                type: 'ADD_NEW_EMPLOYEE_SUCCESS',
                stateUpdate: { newEmployees, showSpinner: false }
            });
        })
        .catch((err) => {
            const { code, message } = err;
            console.log(err);
            dispatch({
                type: 'ADD_NEW_EMPLOYEE_ERR',
                stateUpdate: {
                    addNewEmployeeError: { code, message },
                    showSpinner: false
                }
            });
        });
};