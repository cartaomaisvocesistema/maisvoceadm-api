
import Image from 'next/image';
import Link from 'next/link';

import Slider from '@/components/all/Slider';
import styles from './sectionslider.module.scss';
import favicon from '../../../../public/images/Favicon.svg';

export default function SectionSlider() {

    return (<>
        <div className={styles.sectionslider}>
            <div className={styles.container}>
                <div className={styles.sectionsliderleft}>
                    <Slider />
                </div>
                <div className={styles.sectionsliderright}>
                    <div className={styles.sectionslidercontentright}>
                        <Image src={favicon} className={styles.maisimg} alt='plus' />
                    </div>
                    <div className={styles.sectionslidergroup}>
                        <span className={styles.sectionslidertext}>Planos por apenas:</span>
                        <div className={styles.pricegroup}>
                            <span className={styles.sectionsliderpricers}><sub>R$</sub></span>
                            <span className={styles.sectionsliderprice}>49,</span>
                            <span className={styles.sectionsliderpricecents}><sup>90</sup></span>
                        </div>
                    </div>
                    <div className={styles.sectionslidergroup}>
                        <span className={styles.sectionslidertext}>Consultas a partir de:</span>
                        <div className={styles.pricegroup}>
                            <span className={styles.sectionsliderpricers}><sub>R$</sub></span>
                            <span className={styles.sectionsliderprice}>29,</span>
                            <span className={styles.sectionsliderpricecents}><sup>90</sup></span>
                        </div>
                    </div>
                    <div className={styles.sectionslidergroup}>
                        <Link href='./askcard' className={styles.btnaskcard}>
                            Pedir cartão agora!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>);
}