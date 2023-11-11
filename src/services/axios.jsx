
import axios from 'axios';
import { parseCookies } from 'nookies'
//import { LocalStorage } from 'web-storage-ts';
import localStorage from 'localStorage';

export function getAPIClient(ctx) {

    const token = localStorage.getItem('userToken')

    //const { 'nextauth.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.BASE_URL_API
    })

    api.interceptors.request.use(config => {
        //console.log(config);
        return config;
    })

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // JWT expirado, redirecionar para a página de login
                window.location = '/';
            }
            return Promise.reject(error);
        }
    );

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;

}