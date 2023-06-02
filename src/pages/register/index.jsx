
import Image from 'next/image';

import styles from './register.module.scss';

import bannerregister from '../../../public/images/bannerregister.png';
import MainContainer from '@/layouts/LayoutLandingpage';

export default function Register() {
    return (<>
        <MainContainer>
            <div className={styles.register}>
                <div className={styles.container}>
                    <div className={styles.registerleft}>
                        <span className={styles.registertitle}><span className={styles.registertitlename}>Cadastre-se</span></span>
                        <input className={styles.registerinput} type="text" name="username" placeholder="nome de usuário" required />
                        <input className={styles.registerinput} type="text" name="email" placeholder="email" required />
                        <input className={styles.registerinput} type="text" name="password" placeholder="senha" required />
                        <input type="submit" value="Salvar" className={styles.registerbtn} />
                    </div>
                    <div className={styles.registerright}>
                        <Image src={bannerregister} className={styles.registerbanner} alt='banner2' />
                    </div>
                </div>
            </div>
        </MainContainer>
    </>);
}