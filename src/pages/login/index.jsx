
import styles from './login.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import bannerlogin from '../../../public/images/logotipo2.png';
import MainContainer from '@/layouts/LayoutLandingpage';

export default function Login() {
    return (<>
        <MainContainer>
            <div className={styles.login}>
                <div className={styles.container}>
                    <div>
                        <div className={styles.loginright}>
                            <Image src={bannerlogin} className={styles.loginbanner} alt='banner2' />
                        </div>
                        <span className={styles.titleadmin}>Administrativo</span>
                    </div>
                    <div className={styles.loginleft}>
                        <span className={styles.logintitle}><span className={styles.logintitlename}>Login</span></span>
                        <input className={styles.logininput} type="text" name="username" placeholder="login" required />
                        <input className={styles.logininput} type="text" name="password" placeholder="senha" required />
                        <input type="submit" value="Entrar" className={styles.loginbtn} />
                        <Link className={styles.logintext} href='./'>
                            Esqueceu a senha?
                        </Link>
                    </div>
                </div>
            </div>
        </MainContainer>
    </>);
}

