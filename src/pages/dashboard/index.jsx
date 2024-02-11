import { useState } from "react";

import { api } from "../../services/api";
import { useEffect } from 'react';
import { parseCookies } from "nookies";

import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';

import styles from './dashboard.module.scss';
import { getAPIClient } from "@/services/axios";

import localStorage from 'localStorage';


export default function DashBoard({ props }) {

  const [userValue, setUserValue] = useState({});
  const [userReport, setUserReport] = useState([]);
  const [partnerList, setPartnerList] = useState({});
  const [paymentReport, setPaymentReport] = useState({});

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    getListUsers();
    getListPartners();
    getListPayments();
    recoveryUser();
  }, [])


  const getListUsers = async () => {
    try {
      const response = await api.get('/api/usuarios/usercardsheaders/info')
      const result = response.data;
      setUserReport(result)
    } catch (error) {
      console.log(error);
    }
  }

  const getListPayments = async () => {
    try {
      const response = await api.get('/api/pagamentos/paymentcardsheaders/info')
      const result = response.data;
      setPaymentReport(result)
    } catch (error) {
      console.log(error);
    }
  }

  const getListPartners = async () => {
    try {
      const response = await api.get('/api/parceiros/')
      const result = response.data;
      setPartnerList(result)
    } catch (error) {
      console.log(error);
    }
  }

  const recoveryUser = async () => {
    try {
      const response = await api.get(`/api/usuarios/${userId}`)
      const data = response.data;
      setUserValue(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Home</span>
            </div>
            {/* <div className={styles.containercards}>
              <Link href={'/users'} className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>Usuários</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.cardtitle}>{userReport.emDiaNumber} em dia</span>
                  </div>
                </div>
              </Link>
              <Link href={'/payments'} className={styles.card}>
                <div className={styles.cardpayments}>
                  <span className={styles.cardtitle}>Pagamentos</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsorange}></div>
                    <span className={styles.cardtitle}>{paymentReport.atrasados} atrasados</span >
                  </div>
                </div>
              </Link>
            </div> */}
            <div className={styles.containercards}>
              {userValue.type === 'ADM' &&
                <>
                  <Link href={'/partners'} className={styles.card}>
                    <div className={styles.cardpartners}>
                      <span className={styles.cardtitle}>Parceiros</span>
                      <div className={styles.ctactives}>
                        <div className={styles.dotsgreen}></div>
                        <span className={styles.cardtitle}>{partnerList.amount} parcerias</span>
                      </div>
                    </div>
                  </Link>
                  <Link href={'/partners'} className={styles.card}>
                    <div className={styles.cardfinancial}>
                      <span className={styles.cardtitle}>Gestão</span>
                    </div>
                  </Link>
                </>
              }
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