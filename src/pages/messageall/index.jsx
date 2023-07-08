
import LayoutDashboard from "@/layouts/LayoutDashboard";
import styles from './messageall.module.scss';
import { MdOutlineSpatialAudio } from "react-icons/md";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { useState } from "react";

export default function MessageAll() {

    const [descriptionValue, setDescriptionValue] = useState('');

    return (<>
        <LayoutDashboard>
            <div className={styles.container}>
                <div className={styles.containercards}>
                    <div className={styles.card}>
                        <div className={styles.cardmessages}>
                            <div className={styles.cardmessages}>
                                <div className={styles.ctcardmessagestitle}>
                                    <span className={styles.cardmessagestitle}>Enviar mensagem para todos os usuários.</span>
                                    <MdOutlineSpatialAudio className={styles.iconmessagegreen} />
                                </div>
                                <div className={styles.cardmessagetext}>
                                    <p className={styles.paragraph}><BsFillExclamationTriangleFill className={styles.iconmessage} /> Atenção: Ao clicar no botão serão enviadas mensagens para o whatsapp de todos os usuários do sistema.</p>
                                </div>
                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel} htmlFor="description">
                                        Digite abaixo a mensagem que será enviada para os usuários do Cartão Mais Você:
                                    </label>
                                    <textarea
                                        className={`${styles.forminputtext} ${styles.forminputtextarea}`}
                                        id="description"
                                        name="description"
                                        maxLength='5000'
                                        onChange={e => setDescriptionValue(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className={styles.button} type="submit">
                                    Enviar mensagem via whatsapp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    </>);

}