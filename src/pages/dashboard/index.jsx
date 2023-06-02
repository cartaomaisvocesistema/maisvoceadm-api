
import SectionMain from "@/components/dashboard/SectionMain";
import SectionBanner from "@/components/dashboard/SectionBanner";
import SectionPartner from "@/components/dashboard/SectionPartner";

import LayoutDashBoard from "@/layouts/LayoutDashboard";

import styles from './dashboard.module.scss';

export default function DashBoard() {
  return (
    <>
      <main>
        {/*<LayoutDashBoard>
          <div className={styles.container}>
            <SectionMain />
            <SectionBanner />
            <SectionPartner />
          </div>
  </LayoutDashBoard>*/}
      </main>
    </>
  )
}