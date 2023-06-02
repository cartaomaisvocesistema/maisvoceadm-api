
import { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { MdHome, MdPerson, MdStorefront, MdLocalHospital, MdLogout } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

import styles from './sidebar.module.scss';

export default function SideBar() {

    const [isMobile, setIsMobile] = useState(false);

    return (<>
        <div className={styles.sidebar}>
            <div className={styles.sidebartop}>
                <div className={styles.logo}>
                    <button
                        className={styles.mobilemenuicon}
                        onClick={() => setIsMobile(!isMobile)}
                    >
                        {isMobile ? <FaTimes className={styles.mobilemenuicontimes} /> : <FaBars className={styles.mobilemenuiconbars} />}
                    </button>
                </div>
                {/*div className={styles.close} id='closebtn'>
                    {isMobile ? <FaTimes className={styles.mobilemenuicontimes} /> : <FaBars className={styles.mobilemenuiconbars} />}
    </div>*/}
            </div>
            <div className={styles.sidebarcenter}>
                <ul className={styles.sidelinks}
                    onClick={() => setIsMobile(false)}
                >
                    <Link href='./' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdHome className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Início</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdLocalHospital className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Consultas</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdStorefront className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Produtos</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdPerson className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Perfil</span>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className={styles.sidebarbottom}>
                <ul className={styles.sidelinks}
                    onClick={() => setIsMobile(false)}
                >
                    <Link href='./logout' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdLogout className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Sair</span>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </>);
}