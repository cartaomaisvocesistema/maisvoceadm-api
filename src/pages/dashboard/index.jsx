
import SectionMain from "@/components/dashboard/SectionMain";
import SectionBanner from "@/components/dashboard/SectionBanner";
import SectionPartner from "@/components/dashboard/SectionPartner";

import LayoutDashBoard from "@/layouts/LayoutDashboard";

import styles from './dashboard.module.scss';

export default function DashBoard() {
  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  Usuarios
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardpayments}>
                  Pagamentos
                </div>
              </div>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardpartners}>
                  Parceiros
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardfinancial}>
                  Financeiro
                </div>
              </div>
            </div>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}