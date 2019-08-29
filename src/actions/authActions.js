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
    const exit = () => {
        dispatch({
            type: 'SIGNOUT',
            stateUpdate: {
                auth: null,
                onFirebaseAuth: true
            }
        });
    };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const { displayName, email, uid } = user;
            
            return database.collection('employees').doc(uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const { employeeId, admin } = doc.data();
                        dispatch({
                            type: 'LOGIN_USER',
                            stateUpdate: {
                                auth: {
                                    name: displayName,
                                    employeeId,
                                    admin,
                                    email,
                                    uid
                                },
                                onFirebaseAuth: true
                            }
                        });
                    }
                    else exit();
                })
                .catch(() => exit());
        }
        else exit();

    });
};

export const addNewEmployee = (newEmployee, state, dispatch) => {
    let user = {
        displayName: `${newEmployee.firstName} ${newEmployee.lastName}`,
        uid: null
    };

    dispatch({
        type: 'SET_MODAL_SPINNER',
        stateUpdate: {
            showSpinner: true
        }
    });
    
    return secondaryApp.auth().createUserWithEmailAndPassword(newEmployee.email, newEmployee.password)
        .then((res) => {
            user.uid = res.user.uid;

            return secondaryApp.auth().currentUser.updateProfile({
                displayName: user.displayName
            });
        })
        .then(() => {
            secondaryApp.auth().signOut();
            
            return database.collection('employees').doc(user.uid).set({
                firstName: newEmployee.firstName,
                lastName: newEmployee.lastName,
                displayName: user.displayName,
                employeeId: newEmployee.employeeId,
                admin: newEmployee.admin
            });
        })
        .then(() => {
            let newEmployees = [];

            if (state.newEmployees) newEmployees = Object.keys(state.newEmployees).map((employee) => state.newEmployees[employee]);

            newEmployees.push({ employee: user.displayName, id: newEmployee.employeeId, uid: user.uid });

            dispatch({
                type: 'ADD_NEW_EMPLOYEE_SUCCESS',
                stateUpdate: { 
                    newEmployees,
                    showSpinner: false,
                    emptyCurrentForm: true
                }
            });
            return Promise.resolve({ employee: user.displayName, id: newEmployee.employeeId, uid: user.uid })
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
            return Promise.reject({ code, message });
        });
};