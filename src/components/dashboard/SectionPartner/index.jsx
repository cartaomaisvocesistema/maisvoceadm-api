
import styles from './sectionpartner.module.scss';
import { MdPaid } from 'react-icons/md';

export default function PartnerPanel() {
    return (<>
        <div className={styles.partner}>
            <div className={styles.partnerheader}>
                <h2 className={styles.header}>Parceiros com desconto</h2>
                <p className={styles.description}>Confira quem são os parceiros do Cartão Mais Você e obtenha descontos nos estabelecimentos.</p>
            </div>
            <div className={styles.partnerlist}>
                <div className={styles.partnerlistitem}>
                    <MdPaid className={styles.mainlistitemicon} />
                    <span className={styles.mainlistitemdescription}>Central<br />Park Store</span>
                </div>
                <div className={styles.partnerlistitem}>
                    <MdPaid className={styles.mainlistitemicon} />
                    <span className={styles.mainlistitemdescription}>Loja<br />Pernambucanas</span>
                </div>
                <div className={styles.partnerlistitem}>
                    <span>Parceiro 3</span>
                </div>
                <div className={styles.partnerlistitem}>
                    <span>Parceiro 4</span>
                </div>
            </div>
        </div>
    </>);
}
