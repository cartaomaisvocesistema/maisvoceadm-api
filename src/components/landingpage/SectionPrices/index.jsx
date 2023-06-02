
import styles from './sectionprices.module.scss';
import Image from 'next/image';
import favicon from '../../../../public/images/Favicon.svg';

export default function SectionPrices() {
    return (<>
        <div className={styles.sectionprices}>
            <div className={styles.container}>
                <div className={styles.containercontent}>
                    <div className={styles.sectionpricestop}>
                        <div className={styles.sectioncontentright}>
                            <Image src={favicon} className={styles.maisimg} alt='plus' />
                        </div>
                    </div>
                </div>
                <div className={styles.sectionpricesbottom}>
                    <div className={styles.table}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                Clínico Geral
                            </div>
                            <div className={styles.column}>
                                R$ 29,90
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                Cirurgião Geral
                            </div>
                            <div className={styles.column}>
                                R$ 29,90
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}