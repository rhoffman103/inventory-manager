import database from '../config/firebaseConfig';
import { firebase } from '../config/firebaseConfig';

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
    })
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

export const addNewUser = (user, state, dispatch) => {
    database.collection('users').add(user).then((ref) => {
        let newEmployees = [];

        if (state.newEmployees) {
            const stateEmployees = Object.keys(state.newEmployees);
            newEmployees = stateEmployees.map((employee) => employee);
        }

        else newEmployees.push({ userName: user.email, id: ref.id });

        dispatch({ 
            type: 'ADD_NEW_EMPLOYEE_SUCCESS',
            stateUpdate: { newEmployees }
        });
    });
};