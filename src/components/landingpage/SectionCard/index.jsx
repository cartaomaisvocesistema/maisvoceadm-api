
import Image from 'next/image';
import styles from './sectioncard.module.scss';
import banner from '../../../../public/images/banner7.jpg';
import logo from '../../../../public/images/logotipolaranja.svg';

import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function SectionCard() {

    return (<>
        <div className={styles.sectioncard}>
            <div className={styles.sectioncardleft}>
                <div className={styles.container}>
                    <div className={styles.containerdescription}>
                        <div className={styles.containerdescriptionlogo}>
                            <span className={styles.sectioncardtitle}>O que é o <br /> </span>
                            <Image className={styles.logoimg} src={logo} alt='Cartão + Você' />
                        </div>
                        <ul className={styles.containerdescriptionlist}>
                            <li className={styles.sectioncardtext}>
                                É o cartão de descontos com maiores vantagens e melhores valores da cidade de Rio Grande.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Exames laboratoriais com até 50% de desconto.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Exames de imagem com até 50% de desconto.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Consultas a partir de R$29,90.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Odontologia com até 30% de desconto.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Descontos em serviços e educação.
                            </li>
                            <li className={styles.sectioncardbigtext}>
                                <BsFillCheckCircleFill /> Plano funerário.
                            </li>
                            <li className={styles.sectioncardtext}>
                                Adicione até 2 dependentes e aproveite essas e muitas outras vantagens.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.sectioncardright}>
                <Image src={banner} className={styles.sectioncardbanner} alt='banner 7' />
            </div>
        </div>
    </>);
}