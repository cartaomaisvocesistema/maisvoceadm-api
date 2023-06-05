
import SectionMain from "@/components/dashboard/SectionMain";
import SectionBanner from "@/components/dashboard/SectionBanner";
import SectionPartner from "@/components/dashboard/SectionPartner";

import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';

import styles from './dashboard.module.scss';

export default function DashBoard() {
  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Home</span>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>Usuários</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.cardtitle}>75 ativos</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardpayments}>
                  <span className={styles.cardtitle}>Pagamentos</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsorange}></div>
                    <span className={styles.cardtitle}>28 pendentes</span >
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardpartners}>
                  <span className={styles.cardtitle}>Parceiros</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.cardtitle}>12 parcerias</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardfinancial}>
                  <span className={styles.cardtitle}>Financeiro</span>
                </div>
              </div>
            </div>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}