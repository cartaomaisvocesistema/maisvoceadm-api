
import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import styles from './navbardash.module.scss';
import logo from '../../../../public/images/logotipo.svg';
import bannerlogin from '../../../../public/images/logotipo2.png';
import { MdHelp, MdNotifications, MdLogout } from 'react-icons/md';


export default function NavBarDash() {

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
                    <Link href='./help' className={styles.link}>
                        <li className={styles.topli}>
                            <div className={styles.linkgroup}>
                                <MdHelp className={styles.topliicon} />
                                <span className={styles.toplilabel}>Ajuda</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./notifications' className={styles.link}>
                        <li className={styles.topli}>
                            <div className={styles.linkgroup}>
                                <MdNotifications className={styles.topliicon} />
                                <span className={styles.toplilabel}>Notificações</span>
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