
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
                Usuarios
              </div>
              <div className={styles.card}>
                Pagamentos
              </div>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                Parceiros
              </div>
              <div className={styles.card}>
                Financeiro
              </div>
            </div>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}