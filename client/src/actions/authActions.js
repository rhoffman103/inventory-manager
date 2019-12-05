import { modalSpinner, formRequestAction } from './commonActions';
import { signInWithEmailAndPassword, onAuthStateChanged, authSignOut, addEmployee } from '../database/authAccess';

const loginUser = (dispatch, user) => {
    // For demo purposes, set blink notifications
    // redirect production employees to '/production/px'
    let notifications = {};
    let redirectTo = '/admin'
    if (!user.admin) {
        redirectTo = '/production/px/schedule';
        notifications = {
            nonViewedScheduleUpdate: true,
            subscribedSchedule: "PX"
        }
    }
    dispatch({
        type: 'LOGIN_USER',
        auth: {
            ...user,
            name: user.displayName,
            onFirebaseAuth: true,
            loginError: false,
            redirectTo
        },
        notifications
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
    return signInWithEmailAndPassword(user)
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
    return authSignOut()
    .then(() => exit(dispatch));
};

export const getUser = (dispatch) => {
    return onAuthStateChanged()
    .then((doc) => {
        doc.exists
            ? loginUser(dispatch, { ...doc.data(), uid: doc.id })
            : exit(dispatch)
    })
    .catch(() => exit(dispatch));
};

export const addNewEmployee = (newEmployee, state, dispatch) => {
    const user = {
        firstName: newEmployee.firstName.trim(),
        lastName: newEmployee.lastName.trim(),
        displayName: `${newEmployee.firstName.trim()} ${newEmployee.lastName.trim()}`,
        employeeId: newEmployee.employeeId,
        email: newEmployee.email.trim(),
        admin: false
    };

    dispatch(modalSpinner());
    
    return addEmployee(user, newEmployee.password)
        .then((newUID) => {
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