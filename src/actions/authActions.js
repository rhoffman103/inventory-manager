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
                    loginError: false,
                    name: displayName,
                    email,
                    uid
                },
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

export const addNewUser = (user, dispatch) => {
    database.collection('users').add(user).then((ref) => {
        dispatch({ 
            type: 'LOGIN_USER',
            userName: user.email,
            id: ref.id 
        });
    });
};