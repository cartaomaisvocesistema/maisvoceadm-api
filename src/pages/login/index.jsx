
import styles from './login.module.scss';

import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {

    const router = useRouter();

    useEffect(() => {
        sendHome();
    }, []);

    const sendHome = async () => {
        router.push('/');
    }

    return (<>

    </>);
}

export const getServerSideProps = async (ctx) => {

    const apiClient = getAPIClient(ctx);
    const { ['nextAuth.token']: token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    //await apiClient.get('/users');
    return {
        props: {}
    }
}