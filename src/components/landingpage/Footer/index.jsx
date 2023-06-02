
import Image from 'next/image';
import Link from 'next/link';

import { BsWhatsapp, BsFacebook, BsInstagram, BsFillExclamationTriangleFill } from 'react-icons/bs';

import styles from './footer.module.scss';
import logo from '../../../../public/images/logotiporodape.svg';
import payment from '../../../../public/images/pagamentos.svg';

export default function Footer() {

    return (<>
        <div className={styles.footer}>
            <div className={styles.footerline}>
                <div className={styles.footerall}>
                <BsFillExclamationTriangleFill className={styles.socialicon} />   
                Cartão de desconto não é plano de saúde. Tudo o que o cliente usar ou comprar, será pago por ele ao 
                prestador conveniado, assegurando descontos. 
                </div>
            </div>
            <div className={styles.footerline}>
                <div className={styles.footerleft}>
                    <div className={styles.ct}>
                        <div className={styles.footerleftlogo}>
                            <Image src={logo} className={styles.logoimg} alt='logo' />
                        </div>
                        <div className={styles.footerlefttext1}>
                            &copy; 2023 por Cartão + Você. <br />
                            Todos os direitos reservados.
                        </div>
                        <div className={styles.footerlefttext2}>
                            Telefone Cartão: +55(53)99706-8374<br />
                            Telefone Clínica Marmed: +55(53)99978-2540<br />
                            Email: cartaomaisvoce23@gmail.com<br />
                        </div>
                    </div>
                </div>
                <div className={styles.footercenter}>
                    <div className={styles.ct}>
                        <div className={styles.ctstart}>
                            <span className={styles.socialtitle}>Nossas redes</span>
                            <div className={styles.socialitem}>
                                <BsFacebook className={styles.socialicon} /> <span className={styles.socialtext}>Facebook</span>
                            </div>
                            <div className={styles.socialitem}>
                                <BsWhatsapp className={styles.socialicon} /> <span className={styles.socialtext}>WhatsApp</span>
                            </div>
                            <div className={styles.socialitem}>
                                <BsInstagram className={styles.socialicon} /> <span className={styles.socialtext}>Instagram</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footerright}>
                    <div className={styles.ct}>
                        <div className={styles.ctstart}>
                            <span className={styles.socialtitle}>Formas de pagamento</span>
                            <div className={styles.socialitem}>
                                <Image src={payment} className={styles.paymentimg} alt='formas de pagamento' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </>);
}
