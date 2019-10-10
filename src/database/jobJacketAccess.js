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
                    id: jacketId,
                    inSchedule: false
                });
            })
            .then(() => Promise.resolve(jacketId))
            .catch(err => Promise.reject(err))
    },

    applyProductDescriptions: (querySnapshot) => {
        let jobJackets = [];
        querySnapshot.forEach(jobJacket => {
            jobJackets.push({
                ...jobJacket.data(),
                jobJacketKey: jobJacket.id
            });
        });
        return dbProducts.getAllProductDescriptionsByKey(jobJackets.map(jacket => jacket.productKey))
        .then(products => {
            const fullJobJackets = jobJackets.map(jacket => {
                const found = products.find(product => product.productKey === jacket.productKey)
                return { ...jacket, ...found };
            });
            return Promise.resolve({ jobJackets: fullJobJackets });
        })
    },

    getJobJacketsByProductionLine: ({ line, isCompleted, inSchedule }) => {
        let jobJacketsRef = database.collection('jobJackets');
        jobJacketsRef = jobJacketsRef.where('productionLine', '==', line);
        
        if (isCompleted !== undefined)
            jobJacketsRef = jobJacketsRef.where('complete', '==', isCompleted);

        if (inSchedule !== undefined)
            jobJacketsRef = jobJacketsRef.where('inSchedule', '==', inSchedule);

        return jobJacketsRef
            .get()
            .then(querySnapshot => dbJobJackets.applyProductDescriptions(querySnapshot))
            .catch(() => Promise.reject({
                code: 'db error',
                err: 'Something went wrong fetching Job Jackets'
            }));
    },

    updateJobJackets: (jobJackets) => {
        return Promise.all(
            jobJackets.map(job => database.collection('jobJackets')
                .doc(job.jobJacketKey).update(job.updateObj))
        );
    },

    getAllJobJacketsByKey: (keys) => {
        return Promise.all([].concat(keys)
            .map(key => database.collection('jobJackets').doc(key).get()))
            .then(querySnapshot => dbJobJackets.applyProductDescriptions(querySnapshot));
    },

    getAllJobJacketsWhere: (where) => {
        return database.collection('jobJackets')
            .where(where.property, where.condition, where.value)
            .get()
            .then(querySnapshot => dbJobJackets.applyProductDescriptions(querySnapshot));
    }
};

export default dbJobJackets;