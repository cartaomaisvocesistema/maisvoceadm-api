
import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.scss';
import logo from '../../../../public/images/logotipo.svg';

export default function NavBar() {

    const [isMobile, setIsMobile] = useState(false);

    return (<>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href='./'>
                    <Image className={styles.logoimg} src={logo} alt='Cartão + Você' />
                </Link>
                <ul className={isMobile ? styles.navlinksmobile : styles.navlinks}
                    onClick={() => setIsMobile(false)}
                >
                    <Link href='./'>
                        <li className={styles.navli}>
                            Início
                        </li>
                    </Link>
                    <Link href='./contact'>
                        <li className={styles.navli}>
                            Contato
                        </li>
                    </Link>
                    <li className={styles.navli}>
                        <a className={styles.navlibtn} href='./askcard'>
                            Peça já o seu!
                        </a>
                    </li>
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