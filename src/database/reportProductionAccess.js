import database, { firebase } from '../config/firebaseConfig';

const dbReportProduction = {
    pxAddFinishedProduct: (productsObj, jobJacketKey) => {
        const dbBatch = database.batch();
        const jobJacketRef = database.collection('jobJackets').doc(jobJacketKey);
        const reportedRef = database.collection('jobJackets').doc(jobJacketKey).collection('reportedProducts');
        const incrementTotalRolls = firebase.firestore.FieldValue.increment(productsObj.rolls.length);
        const incrementProductionMinutes = firebase.firestore.FieldValue.increment(productsObj.productionMinutes);
        
        return jobJacketRef.get()
        .then(doc => {
            if (doc.exists) return Promise.resolve(doc.data());
            else return Promise.reject({
                code: 'No Document',
                message: 'No such document!'
            });
        })
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
            console.log('COMMITTED')
        })
        .catch(err => console.log(err))

    }
}

export default dbReportProduction;