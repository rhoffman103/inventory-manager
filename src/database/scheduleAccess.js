import database from '../config/firebaseConfig';
import dbJobJackets from './jobJacketAccess';

const dbSchedule = {
    addToSchedule: ({ line, job }) => {
        return database.collection(`${line}Schedule`).add({
            jobJacketKey: job.dbId,
            position: job.position
        });
    },

    removeFromSchedule: ({ line, key }) => {
        return database.collection(`${line}Schedule`).doc(key).delete();
    },

    getScheduleByLine: (line) => {
        let schedule = [];
        return database.collection(`${line}Schedule`)
        .orderBy('position').get()
        .then(querySnapshot => {
            querySnapshot.forEach(job => {
                schedule.push({ ...job.data(), dbId: job.id });
            });

            return dbJobJackets.getAllJobJacketsByKey(Object.keys(schedule)
                .map(i => schedule[i].jobJacketKey)
            );
        })
        .then(data => {
            let mutatedSchedule = data.jobJackets.map(jobJacket => {
                return {
                    ...schedule.find(job => {
                        if (job.jobJacketKey === jobJacket.jobJacketKey) {
                            return job;
                        }
                    }),
                    ...jobJacket
                };
            });
            return Promise.resolve({ jobJackets: mutatedSchedule });
        })
        .catch(() => Promise.reject({
            code: 'db error',
            err: 'Something went wrong fetching Job Jackets'
        }));
    },

    updateScheduleOrder: ({ schedule, line }) => {
        let newJobs = [];
        let keys = []
        const existingJobs = schedule.filter(job => {
            if (job.dbId) {
                keys.push(job.dbId);
                return job;
            }
            else newJobs.push({
                customer: job.customer,
                description: job.description,
                dueDate: job.dueDate,
                jobJacketKey: job.jobJacketKey,
                position: job.position
            });
            return false;
        });

        return new Promise (resolve => {
            if (existingJobs.length) {
                
                const keys = Object.keys(existingJobs).map((key, index) => existingJobs[index].dbId)
                Promise.all(
                    keys
                    .map((key, index) => database.collection(`${line}Schedule`)
                    .doc(key).update({ position: existingJobs[index].position }))
                )
                .then(() => resolve(newJobs));
            }
            else return resolve(newJobs);
        })
        .then((jobs) => {
            
            if (jobs) {
                return Promise.all(
                    jobs
                    .map((job) => database.collection(`${line}Schedule`)
                    .add(job))
                );
            }
            else return Promise.resolve();
        })
    }
};

export default dbSchedule;