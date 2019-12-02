import database, { firebase } from '../config/firebaseConfig';
const getDocFromRef = (ref) => {
    return ref.get()
    .then(doc => {
        if (doc.exists) return Promise.resolve(doc.data());
        else return Promise.reject({
            code: 'No Document',
            message: 'No such document!'
        });
    })
};

const dbReportProduction = {
    pxAddFinishedProduct: function (productsObj, jobJacketKey) {
        const dbBatch = database.batch();
        const jobJacketRef = database.collection('jobJackets').doc(jobJacketKey);
        const reportedRef = database.collection('jobJackets').doc(jobJacketKey).collection('reportedProducts');
        const incrementTotalRolls = firebase.firestore.FieldValue.increment(productsObj.rolls.length);
        const incrementProductionMinutes = firebase.firestore.FieldValue.increment(productsObj.productionMinutes);

        return getDocFromRef(jobJacketRef)
        .then(data => {
            let finishedRolls = 0;
            
            productsObj.rolls.forEach((roll, index) => {
                if (!roll.needsRework) finishedRolls++;
                const productDocRef = reportedRef.doc();
                dbBatch.set(productDocRef, {
                    ...roll,
                    tagId: `${data.id}${data.totalRollCount + (index + 1)}`
                })
            });

            const incrementFinsihedRolls = firebase.firestore.FieldValue.increment(finishedRolls);
            
            dbBatch.update(jobJacketRef, {
                totalRollCount: incrementTotalRolls,
                finishedRollCount: incrementFinsihedRolls,
                productionMinutes: incrementProductionMinutes
            });

            return dbBatch.commit();
        })
        .then(() => {
            console.log('COMMITTED PRODUCTS');
            return Promise.resolve({ 
                status: 200,
                code: '',
                message: 'Successfully added new product.'
            });
        })
        .catch(err => {
            console.log(err);
            return Promise.reject({
                code: err.code,
                message: err.message,
                status: err.status
            });
        });
    },

    pxGetreportedProducts: function (jobJacketKey) {
        return database
        .collection('jobJackets')
        .doc(jobJacketKey)
        .collection('reportedProducts')
        .orderBy('tagId', 'desc')
        .get()
        .then((doc) => {
            return doc.docs.length
            ?   Promise.resolve({
                    reportedProducts: doc.docs.map((docSnapshot) => docSnapshot.data())
                })
            :   Promise.resolve({ reportedProducts: [] });   
        })
        .catch((err) => Promise.reject({
            code: err.code,
            message: err.message
        }))
    },

    reportScrap: function (scrapObj) {
        const dbBatch = database.batch();
        const jobJacketRef = database.collection('jobJackets').doc(scrapObj.jobJacketKey);
        const scrapRef = database.collection('jobJackets').doc(scrapObj.jobJacketKey).collection('reportedScrap');
        const incrementTotalScrap = firebase.firestore.FieldValue.increment(scrapObj.totalWeight);
        const incrementScrapEntries = firebase.firestore.FieldValue.increment(scrapObj.scrapArray.length);

        return getDocFromRef(jobJacketRef)
        .then((docData) => {
            scrapObj.scrapArray.forEach((elem, index) => {
                dbBatch.set(scrapRef.doc(), {
                    ...elem,
                    tagId: `${docData.id}S${docData.scrapEntries + (index + 1)}`
                })
            });

            dbBatch.update(jobJacketRef, {
                totalScrap: incrementTotalScrap,
                scrapEntries: incrementScrapEntries
            });

            return dbBatch.commit();

        })
        .then(() => Promise.resolve({ 
            status: 200,
            code: '',
            message: 'Successfully added scrap.'
        }))
        .catch(err => Promise.reject({
            code: err.code,
            message: err.message,
            status: err.status
        }));
    }
}

export default dbReportProduction;