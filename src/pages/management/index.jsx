
import { MdOutlineMessage, MdPayments, MdSupervisedUserCircle } from 'react-icons/md';
import styles from './management.module.scss';
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";

export default function Management() {

    return (<>
        <LayoutDashBoard>
            <div className={styles.container}>
                <div className={styles.containercards}>
                    <Link href={'/usersreport'}>
                        <div className={styles.card}>
                            <div className={styles.cardusers}>
                                <div className={styles.ctactives}>
                                    <MdSupervisedUserCircle className={styles.mainlistitemicon} />
                                    <span className={styles.mainlistitemdescription}>Relatório de usuários</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={'/paymentsreport'}>
                        <div className={styles.card}>
                            <div className={styles.cardusers}>
                                <div className={styles.ctactives}>
                                    <MdPayments className={styles.mainlistitemicon} />
                                    <span className={styles.mainlistitemdescription}>Relatório de pagamentos</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={'/activityreport'}>
                        <div className={styles.card}>
                            <div className={styles.cardusers}>
                                <div className={styles.ctactives}>
                                    <MdOutlineMessage className={styles.mainlistitemicon} />
                                    <span className={styles.mainlistitemdescription}>Relatório de Atividades</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </LayoutDashBoard>
    </>);

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