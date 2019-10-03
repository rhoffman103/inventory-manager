import database, { firebase, secondaryApp } from '../config/firebaseConfig';
import { modalSpinner, formRequestAction } from './commonActions';

const loginUser = (dispatch, user) => {
    dispatch({
        type: 'LOGIN_USER',
        auth: {
            ...user,
            name: user.displayName,
            onFirebaseAuth: true,
            loginError: false
        }
    });
};

const exit = (dispatch) => {
    dispatch({ type: 'SIGNOUT' });
};

const loginErrorAction = ({auth, loginError = false }) => ({
    type: 'SET_LOGIN_ERROR',
    auth,
    loginError
})

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
            dispatch(loginErrorAction({
                loginError: { code, message }
            }));
        });
};

export const resetLoginError = (auth, dispatch) => {
    dispatch(loginErrorAction({ auth }));
};

export const signOut = (dispatch) => {
    firebase.auth().signOut()
    .then(() => exit(dispatch));
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

    dispatch(modalSpinner());
    
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

            dispatch(formRequestAction({
                emptyCurrentForm: true,
                data: { message: `Added new employee: ${user.displayName}` }
            }));

            return Promise.resolve({ employee: user.displayName, id: newEmployee.employeeId, uid: newUID })
        })
        .catch((err) => {
            const { code, message } = err;
            console.log(err);
            dispatch(formRequestAction({
                data: { err: { message, code } }
            }));
            return Promise.reject({ code, message });
        });
};