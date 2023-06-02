
import styles from './topbar.module.scss';

import { MdHelp, MdNotifications, MdLogout } from 'react-icons/md';
import Link from 'next/link';

export default function TopBar() {
    return (<>
        <div className={styles.topbar}>
            <div className={styles.topleft}>
                <span className={styles.message}>Olá, Alexandre!</span>
            </div>
            <div className={styles.topright}>
                <ul className={styles.toplinks}>
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
            </div>
        </div>
    </>);
}