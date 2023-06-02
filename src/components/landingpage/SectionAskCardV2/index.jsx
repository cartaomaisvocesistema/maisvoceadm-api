
import styles from './sectionaskcardv2.module.scss';
import favicon from '../../../../public/images/Favicon.svg';
import Link from 'next/link';
import Image from 'next/image';

import card from '../../../../public/images/cartaomaisvoce.png'
import woman from '../../../../public/images/backgroundv22.png'

import { BsWhatsapp } from 'react-icons/bs';

export default function SectionAskCardV2() {
    return (<>
        <div className={styles.sectionaskcard}>
            <div className={styles.container}>
                <div className={styles.containerwhite}>
                    <div className={styles.sectionleft}>
                        <div className={styles.sectionleftcard}>
                            <Image src={card} className={styles.cardimg} alt='cards' />
                        </div>
                        <div className={styles.sectionleftbottom}>
                            <div className={styles.sectionlefttext}>
                                Fácil de <b>pedir</b>.
                            </div>
                            <div className={styles.sectionlefttext}>
                                Fácil de <b>usar</b>.
                            </div>
                            <div className={styles.sectionlefttext}>
                                Fácil de <b>pagar</b>.
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionright}>
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
                                <BsWhatsapp className={styles.iconbtn} />
                                Pedir cartão!
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionimage}>
                    <Image src={woman} className={styles.womanimg} alt='woman' />
                </div>
            </div>
        </div>
    </>);
}