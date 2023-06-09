
import axios from 'axios';
import { parseCookies } from 'nookies'
//import { LocalStorage } from 'web-storage-ts';
import localStorage from 'localStorage';


export function getAPIClient(ctx) {
    const token = localStorage.getItem('userToken')

    //const { 'nextauth.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333'
    })

    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;

}