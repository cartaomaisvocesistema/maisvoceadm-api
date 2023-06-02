import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './sectionmarmed.module.scss';
import transition from './transition.module.scss';
import favicon from '../../../../public/images/Favicon.svg';
import { CSSTransition } from 'react-transition-group';
import banner3 from '../../../../public/images/background-sectionmarmed.png';
import marmed from '../../../../public/images/marmed.jpeg';

export default function SectionMarmed() {

    const [showMap, setShowMap] = useState(false);
    const nodeRef = useRef(null);

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    return (<>
        <div className={styles.sectionmarmed}>
            <div className={styles.container}>

                <div className={styles.containercontent}>

                    <div className={styles.sectionmarmedtop}>
                        <div className={styles.sectionslidercontentright}>
                            <Image src={favicon} className={styles.maisimg} alt='plus' />
                        </div>
                    </div>
                    <div className={styles.sectionmarmedbottom}>
                        <div className={styles.sectionmarmedleft}>
                            <span className={styles.sectionmarmedtitle}>
                                Clínica parceira <br /><span className={styles.sectionmarmedtitleorange}>MARMED</span>
                            </span>
                            <span className={styles.sectionmarmedtext}>
                                A clínica parceira Marmed conta com uma gama de mais de 10 especialistas 
                                disponíveis para todos os usuários do Cartão Mais Você.
                                <br/>
                                <b>Telefone Clínica Marmed: +55(53)99978-2540</b>
                            </span>
                            
                            <div className={styles.groupbutton}>
                                <a className={styles.btndescontos} onClick={toggleMap}>
                                    Ver localização
                                </a>
                                <a className={styles.btndescontos} href= "https://instagram.com/clinica.marmed?igshid=YmMyMTA2M2Y=" 
                                target = "_blank">
                                    Visitar Website
                                </a>
                            </div>
                        </div>
                        <div className={styles.sectionmarmedright}>
                            <Image src={marmed} className={styles.marmedimg} alt='marmed' />
                        </div>
                    </div>
                    <CSSTransition
                        in={showMap}
                        timeout={1000}
                        nodeRef={nodeRef}
                        classNames={{
                            enter: transition.mapEnter,
                            enterActive: transition.mapEnterActive,
                            exit: transition.mapExit,
                            exitActive: transition.mapExitActive,
                        }}
                        unmountOnExit
                    >
                        <div className={`${transition.map}  ${styles.googlemaps}`} ref={nodeRef}>
                            <iframe title='meumapa' className={styles.googlemaps}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.2553280860006!2d-52.0983384960745!3d-32.03527966643119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95119c0e4c3fbe0f%3A0xf9e5f25b534951a!2sR.%20Duque%20de%20Caxias%2C%20326%20-%20Centro%2C%20Rio%20Grande%20-%20RS%2C%2096200-020!5e0!3m2!1spt-BR!2sbr!4v1677537835635!5m2!1spt-BR!2sbr"
                                 loading="lazy" />
                        </div>
                    </CSSTransition>
                </div>

            </div>

        </div>
    </>);
}