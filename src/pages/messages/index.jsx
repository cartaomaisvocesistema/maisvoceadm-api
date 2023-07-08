
import LayoutDashboard from "@/layouts/LayoutDashboard";
import styles from './messages.module.scss';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineSpatialAudio } from "react-icons/md";

export default function Messages() {

    return (<>
        <LayoutDashboard>
            <div className={styles.container}>
                <div className={styles.containercards}>
                    <div className={styles.card}>
                        <div className={styles.cardmessages}>
                            <BsFillExclamationTriangleFill className={styles.iconmessagered} />
                            <Link href={`/messagelate`} className={styles.btpayments}>
                                Enviar mensagem para usuários atrasados.
                            </Link>

                        </div>

                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardmessages}>
                            <MdOutlineSpatialAudio className={styles.iconmessagegreen} />
                            <Link href={`/messageall`} className={styles.btpayments}>
                                Enviar mensagem para todos os usuários.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    </>);

}