
import Image from 'next/image';

import styles from './section4.module.scss';

import partner1 from '../../../../public/images/partner1.png';
import banner3 from '../../../../public/images/banner3.png';

export default function Section4() {

    return (<>
        {/* HTML DA classname section4 */}
        <div className={styles.section4}>
            <div className={styles.container}>
                <div className={styles.partners}>
                    <Image src={partner1} className={styles.section4banner} alt='guardioesdavida' />
                    <Image src={banner3} className={styles.section4banner} alt='banner1' />
                </div>
            </div>
        </div>
        {/* Fim HTML DA classname section4 */}
    </>);
}
