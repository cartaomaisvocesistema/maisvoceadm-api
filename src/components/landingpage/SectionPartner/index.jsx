
import styles from './sectionpartner.module.scss';
import favicon from '../../../../public/images/Favicon.svg';
import partner from '../../../../public/images/guardioes.png';
import Link from 'next/link';
import Image from 'next/image';


export default function SectionPartner() {
    return (<>
        <div className={styles.sectionpartner}>
            <div className={styles.container}>
                <div className={styles.containercontent}>
                    <div className={styles.sectionpartnertop}>
                        <div className={styles.sectionpartnercontentright}>
                            <Image src={favicon} className={styles.maisimg} alt='plus' />
                        </div>
                    </div>
                    <div className={styles.sectionpartnerbottom}>
                        <div className={styles.sectionpartnerleft}>
                            <div className={styles.sectionpartnerleftct}>
                                <span className={styles.sectionpartnertitle}>
                                    <span className={styles.sectionpartnertitleorange}>
                                        GUARDIÕES 
                                        <br/>
                                        DA VIDA</span>
                                </span>
                                <span className={styles.sectionpartnertext}>
                                    A Guardiões da Vida é mais um dos parceiros do Cartão Mais Você.
                                </span>
                            </div>
                            
                            <a className={styles.btndescontos} href= "https://www.gvresgate.com" 
                                target = "_blank">
                                    Visitar Website
                            </a>
                        </div>
                        <div className={styles.sectionpartnerright}>
                            <Image src={partner} className={styles.partnerimg} alt='guardioes' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}