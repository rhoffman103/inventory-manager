import database from '../config/firebaseConfig';
import dbJobJackets from './jobJacketAccess';

const dbSchedule = {
    addToSchedule: ({ line, job }) => {
        return database.collection(`${line}Schedule`).add({
            jobJacketKey: job.scheduleKey,
            position: job.position
        });
    },

    removeFromSchedule: ({ keys, line }) => {
        if (keys.length) {
            if (typeof keys === 'string') return database.collection(`${line}Schedule`).doc(keys).delete();
            else return Promise.all(keys.map(key => database.collection(`${line}Schedule`).doc(key).delete()));
        }
        else return Promise.resolve();
    },

    pairScheduleWithJobJacket: (data, schedule) => {
        return data.jobJackets.map(jobJacket => {
            return {
                ...schedule.find(job => {
                    if (job.jobJacketKey === jobJacket.jobJacketKey) {
                        return job;
                    }
                    else return false;
                }),
                ...jobJacket
            };
        });
    },

    getScheduleByLine: (line) => {
        let schedule = [];
        return database.collection(`${line}Schedule`)
        .orderBy('position').get()
        .then(querySnapshot => {
            querySnapshot.forEach(job => {
                schedule.push({ ...job.data(), scheduleKey: job.id });
            });

            return dbJobJackets.getAllJobJacketsByKey(Object.keys(schedule)
                .map(i => schedule[i].jobJacketKey)
            );
        })
        .then(data => {
            let mutatedSchedule = dbSchedule.pairScheduleWithJobJacket(data, schedule);
            return Promise.resolve({ schedule: mutatedSchedule });
        })
        .catch(() => Promise.reject({
            code: 'db error',
            err: 'Something went wrong fetching Job Jackets'
        }));
    },

    updateScheduleOrder: ({ schedule, removedKeys, line }) => {
        let newJobs = [];
        const existingJobs = schedule.filter(job => {
            if (job.scheduleKey) return job;
            else newJobs.push({
                jobJacketKey: job.jobJacketKey,
                position: job.position,
                instructions: job.instructions || []
            });
            return false;
        });

        return dbSchedule.removeFromSchedule({ line, keys: removedKeys })
        .then(() => {
            if (existingJobs.length) 
                return Promise.all(
                    existingJobs
                    .map((job) => database.collection(`${line}Schedule`)
                    .doc(job.scheduleKey).update({ 
                        position: job.position,
                        instructions: job.instructions || []
                    }))
                );
            else return Promise.resolve();
        })
        .then(() => {
            
            if (newJobs.length) {
                return Promise.all(
                    newJobs
                    .map((job) => database.collection(`${line}Schedule`)
                    .add(job))
                );
            }
            else return Promise.resolve();
        })
    },

    listenForScheduleByLine: (line, callback) => {
        return database.collection(`${line}Schedule`)
        .orderBy('position')
        .onSnapshot(querySnapshot => {
            let schedule = [];
            querySnapshot.forEach(job => {
                schedule.push({ ...job.data(), scheduleKey: job.id });
            });
            
            dbJobJackets.getAllJobJacketsByKey(Object.keys(schedule)
            .map(i => schedule[i].jobJacketKey))
            .then(data => {
                let mutatedSchedule = dbSchedule.pairScheduleWithJobJacket(data, schedule);
                callback({ schedule: mutatedSchedule });
            })
            .catch(err => callback({ err: err.message, code: err.code }));
        },
        (err) => callback({ err: err.message, code: err.code }));
    }
};

export default dbSchedule;