
import { MdPaid, MdPendingActions, MdMedicalServices } from 'react-icons/md';
import styles from './sectionmain.module.scss';

export default function SectionMain() {
  return (<>
    <div className={styles.main}>
      <div className={styles.mainlist}>
        <div className={styles.mainlistitem}>
          <MdPaid className={styles.mainlistitemicon} />
          <span className={styles.mainlistitemdescription}>Pagar mensalidades</span>
        </div>
        <div className={styles.mainlistitem}>
          <MdPendingActions className={styles.mainlistitemicon} />
          <span className={styles.mainlistitemdescription}>Histórico de pagamentos</span>
        </div>
        <div className={styles.mainlistitem}>
        <MdMedicalServices className={styles.mainlistitemicon} />
          <span className={styles.mainlistitemdescription}>Clínicas</span>
        </div>
        <div className={styles.mainlistitem}>
          <span>Função 4</span>
        </div>
      </div>
    </div>
  </>);
}
