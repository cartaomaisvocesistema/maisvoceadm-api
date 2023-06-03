
import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.scss';
import logo from '../../../../public/images/logotipo.svg';
import bannerlogin from '../../../../public/images/logotipo2.png';

export default function NavBar() {

    const [isMobile, setIsMobile] = useState(false);

    return (<>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href='./'>
                    <Image className={styles.logoimg} src={bannerlogin} alt='Cartão + Você' />
                </Link>
                <span className={styles.navlilogo}>ADM</span>
                <ul className={isMobile ? styles.navlinksmobile : styles.navlinks}
                    onClick={() => setIsMobile(false)}
                >
                    <Link href='http://cartaomaisvc.com.br'>
                        <li className={styles.navli}>
                            Portal Cliente
                        </li>
                    </Link>
                    <Link href='./login'>
                        <li className={styles.navli}>
                            Login
                        </li>
                    </Link>
                </ul>
                <button
                    className={styles.mobilemenuicon}
                    onClick={() => setIsMobile(!isMobile)}
                >
                    {isMobile ? <FaTimes className={styles.mobilemenuicontimes} /> : <FaBars className={styles.mobilemenuiconbars} />}
                </button>
            </div>
        </nav>
    </>);
}