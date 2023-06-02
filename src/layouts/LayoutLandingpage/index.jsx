
import NavBar from '@/components/landingpage/NavBar';
import Footer from '@/components/landingpage/Footer';

import styles from './landingpage.module.scss';

export default function LandingPage({ children }) {
    return (<>
        <div className={styles.maincontainer}>
            <NavBar />
            {children}
            <Footer />
        </div>
    </>);
}