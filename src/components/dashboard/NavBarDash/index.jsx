
import { useEffect, useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import styles from './navbardash.module.scss';
import logo from '../../../../public/images/logotipo.svg';
import bannerlogin from '../../../../public/images/logotipo3.png';
import { MdHelp, MdNotifications, MdLogout } from 'react-icons/md';
import { api } from '@/services/api';
import localStorage from 'localStorage';

export default function NavBarDash() {

    const userId = localStorage.getItem('userId')

    const [usernameValue, setUsernameValue] = useState('');

    useEffect(() => {
        recoveryUser()
    }, [])

    const recoveryUser = async () => {
        const response = await api.get(`/api/usuarios/${userId}`)
        const data = (response).data;
        setUsernameValue(data.username);
    }

    return (<>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.ctlogoadm}>
                    <Link href='./'>
                        <Image className={styles.logoimg} src={bannerlogin} alt='Cartão + Você' />
                    </Link>
                    <span className={styles.navlilogo}>ADM</span>
                </div>
                <span className={styles.cumprimento}>Olá, {usernameValue}</span>
                <div className={styles.ctmsglinks}>
                    <ul className={styles.navlinks}
                        onClick={() => setIsMobile(false)}
                    >
                        <Link href='./help' className={styles.link}>
                            <li className={styles.topli}>
                                <div className={styles.linkgroup}>
                                    <MdHelp className={styles.topliicon} />
                                    <span className={styles.toplilabel}>Ajuda</span>
                                </div>
                            </li>
                        </Link>
                        <Link href='./logout' className={styles.link}>
                            <li className={styles.topli}>
                                <div className={styles.linkgroup}>
                                    <MdLogout className={styles.topliicon} />
                                    <span className={styles.toplilabel}>Sair</span>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}