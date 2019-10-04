import database, { firebase } from '../config/firebaseConfig';
import dbProducts from './productsAccess';
import moment from 'moment';

const dbJobJackets = {
    addNewJobJacket: (jobJacket) => {

        let jacketId = '';
        const jacketControlRef = database.collection('control').doc('jobJackets')
        const increment = firebase.firestore.FieldValue.increment(1);

        return jacketControlRef.update({ count: increment })
            .then(() => jacketControlRef.get())
            .then(doc => {
                if (doc.exists) return Promise.resolve(doc.data());
                else return Promise.reject({
                    code: 'No Document',
                    message: 'No such document!'
                });
            })
            .then(data => {
                let jacketNum = [jobJacket.productionLine];
                const count = data.count.toString();
        
                for (let i = 0; i < 6 - count.length; i++) jacketNum.push('0');
                jacketId = jacketNum.join('') + count
                
                return database.collection('jobJackets').add({
                    ...jobJacket,
                    complete: false,
                    dueDate: moment(jobJacket.dueDate, 'MM-DD-YYYY').format('x'),
                    id: jacketId
                });
            })
            .then(() => Promise.resolve(jacketId))
            .catch(err => Promise.reject(err))
    },

    getJobJacketsByProductionLine: (line) => {
        let jobJackets = [];
        return database.collection('jobJackets')
            .where('productionLine', '==', line)
            .where('complete', '==', false)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((jobJacket, index) => {
                    jobJackets.push({ ...jobJacket.data(), dbId: jobJacket.id });
                });
                return dbProducts.getAllProductsByKey(Object.keys(jobJackets)
                    .map(i => jobJackets[i].productKey)
                );
            })
            .then(querySnapshot => {
                querySnapshot.forEach((product, i) => {
                    jobJackets.filter(job => {
                        if (job.productKey === product.id) {
                            job.description = product.data().description;
                            return true;
                        }
                    });
                });
                return Promise.resolve({ jobJackets });
            })
            .catch(() => Promise.reject({
                code: 'db error',
                err: 'Something went wrong fetching Job Jackets'
            }))
    }
};

export default dbJobJackets;