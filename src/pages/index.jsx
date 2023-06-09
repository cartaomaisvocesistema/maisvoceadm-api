import Head from 'next/head';

{/*import { Inter } from '@next/font/google';*/ }

import LayoutLandingPage from '@/layouts/LayoutLandingpage';
import SectionSlider from '@/components/landingpage/SectionSlider';
import SectionCard from '@/components/landingpage/SectionCard';
import SectionAskCard from '@/components/landingpage/SectionAskCard';
import SectionAskCardV2 from '@/components/landingpage/SectionAskCardV2';
import SectionMarmed from '@/components/landingpage/SectionMarmed';
import Footer from '@/components/landingpage/Footer';
import SectionPartner from '@/components/landingpage/SectionPartner';
import SectionAskCardChat from '@/components/landingpage/SectionAskCardChat';
import SectionPrices from '@/components/landingpage/SectionPrices';
import styles from './home.module.scss';
import bannerlogin from '../../public/images/logotipo2.png';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useEffect } from 'react';

{/*const inter = Inter({ subsets: ['latin'] });*/ }

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext)

  //aqui seria o melhor lugar para fazer o tratamento de erros do backend , senha ou email invalido, essas coisas
  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Cartão Mais Você</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LayoutLandingPage>
          <div className={styles.login}>
            <div className={styles.container}>
              <div>
                <div className={styles.loginright}>
                  <Image src={bannerlogin} className={styles.loginbanner} alt='banner2' />
                </div>
                <span className={styles.titleadmin}>Administrativo</span>
              </div>
              <div className={styles.loginleft}>
                <form className={styles.loginleft} onSubmit={handleSubmit(handleSignIn)}>
                  <span className={styles.logintitle}><span className={styles.logintitlename}>Login</span></span>
                  <input
                    {...register('email')}
                    className={styles.logininput} type="text" name="email" placeholder="login" required />
                  <input
                    {...register('password')}
                    className={styles.logininput} type="text" name="password" placeholder="senha" required />
                  <input type="submit" value="Entrar" className={styles.loginbtn} />
                  <Link className={styles.logintext} href='./'>
                    Esqueceu a senha?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </LayoutLandingPage>
      </main>
    </>
  )
}
