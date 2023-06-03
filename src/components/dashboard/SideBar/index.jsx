
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
                                <MdPerson className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Usuários</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdStorefront className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Pagamentos</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdLocalHospital className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Parceiros</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./profile' className={styles.link}>
                        <li className={styles.sideli}>
                            <div className={styles.linkgroup}>
                                <MdLocalHospital className={styles.sideliicon} />
                                <span className={styles.sidelilabel}>Financeiro</span>
                            </div>
                        </li>
                    </Link>
                    <Link href='./' className={styles.link}>
                        <li className={styles.sidelimenu}>
                            <div className={styles.linkgroup}>
                                <button
                                    className={styles.mobilemenuicon}
                                    onClick={() => setIsMobile(!isMobile)}
                                >
                                    {isMobile ? <FaTimes className={styles.sideliicon} /> : <FaBars className={styles.sideliicon} />}
                                </button>
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </>);
}