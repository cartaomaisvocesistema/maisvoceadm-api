
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import styles from './dashboard.module.scss';

export default function DashBoard({ children }) {
    return (<>
        <div className={styles.maincontainer}>
            <div className={styles.containerleft}>
                <SideBar />
            </div>
            <div className={styles.containerright}>
                <TopBar />
                {children}
            </div>
        </div>
    </>);
}