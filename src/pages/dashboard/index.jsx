
import SectionMain from "@/components/dashboard/SectionMain";
import SectionBanner from "@/components/dashboard/SectionBanner";
import SectionPartner from "@/components/dashboard/SectionPartner";
import { useState } from "react";

import { api } from "../../services/api";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";

import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';

import styles from './dashboard.module.scss';
import { getAPIClient } from "@/services/axios";

export default function DashBoard({ props }) {
  const { user, token } = useContext(AuthContext)


  useEffect(() => {
  }, [])




  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Home</span>
            </div>
            <div className={styles.containercards}>
              <Link href={'/users'} className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>Usuários</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.cardtitle}>75 ativos</span>
                  </div>
                </div>
              </Link>
              <Link href={'/payments'} className={styles.card}>
                <div className={styles.cardpayments}>
                  <span className={styles.cardtitle}>Pagamentos</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsorange}></div>
                    <span className={styles.cardtitle}>28 pendentes</span >
                  </div>
                </div>
              </Link>
            </div>
            <div className={styles.containercards}>
              <Link href={'/partners'} className={styles.card}>
                <div className={styles.cardpartners}>
                  <span className={styles.cardtitle}>Parceiros</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.cardtitle}>12 parcerias</span>
                  </div>
                </div>
              </Link>
              <Link href={'/financial'} className={styles.card}>
                <div className={styles.cardfinancial}>
                  <span className={styles.cardtitle}>Financeiro</span>
                </div>
              </Link>
            </div>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx);
  const { ['nextAuth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  //await apiClient.get('/users');

  return {
    props: {}
  }

}






