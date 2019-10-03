import database, { firebase, secondaryApp } from '../config/firebaseConfig';

export const signInWithEmailAndPassword = ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((ref) => {
            return database.collection('employees').doc(ref.user.uid).get()
        })
        .catch(err => Promise.reject(err));
};

export const onAuthStateChanged = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) return resolve(user);
            else return reject();
        })
    })
    .then(user => {
        return database.collection('employees').doc(user.uid).get()
    })
    .catch(() => Promise.reject());
};

export const authSignOut = () => {
    return firebase.auth().signOut()
};

export const addEmployee = (user, password) => {
    let newUID = null;

    return database.collection('employees').where('employeeId', '==', user.employeeId).get()
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
                message: `Employee ID: ${user.employeeId} already exists`
            });
        }
        else return Promise.resolve();
    })
    .then(() => secondaryApp.auth().createUserWithEmailAndPassword(user.email, password))
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
    .then(() => Promise.resolve(newUID))
    .catch(err => Promise.reject(err))
};