import axios from 'axios';
import { firebase } from '../config/firebaseConfig';

axios.interceptors.request.use(async config => {
    console.log('Config auth token')
    config.headers.token = await firebase.auth().currentUser.getIdToken()
    return config;
}, (error) => {
    return Promise.reject(error)
});

const basePath = '/inventory-manager-f97b8/us-central1/app';
const v1 = `${basePath}/v1`;

export const postTest = () => {
    return axios.post(`${v1}/test`, { stuff: 'Pile of stuff!' })
};