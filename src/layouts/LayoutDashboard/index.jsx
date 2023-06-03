
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import styles from './dashboard.module.scss';
import NavBar from '@/components/dashboard/NavBarDash';

export default function DashBoard({ children }) {
    return (<>
        <div className={styles.maincontainer}>
            <div className={styles.ct1}>
                <NavBar />
                <div className={styles.ct2}>
                    <SideBar />
                    {children}
                </div>
            </div>
        </div>
    </>);
}