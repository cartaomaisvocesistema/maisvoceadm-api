
import LayoutDashboard from "@/layouts/LayoutDashboard";
import styles from './messagelate.module.scss';
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";

export default function MessageLate() {

    return (<>
        <LayoutDashboard>
            <div className={styles.container}>
                <div className={styles.containercards}>
                    <div className={styles.card}>
                        <div className={styles.cardmessages}>
                            <div className={styles.ctcardmessagestitle}>
                                <span className={styles.cardmessagestitle}>Enviar mensagem para usuários atrasados</span>
                                <BsFillExclamationTriangleFill className={styles.iconmessagered} />
                            </div>
                            <div className={styles.cardmessagetext}>
                                <p className={styles.paragraph}><BsFillExclamationTriangleFill className={styles.iconmessage} /> Atenção: Ao clicar no botão serão enviadas mensagens para o whatsapp de todos os usuários atrasados com alerta de pagamento. O corpo da mensagem irá conter o texto abaixo:</p>
                                <br />
                                <p className={styles.paragraph}>"Cartão Mais Você: Identificamos um pagamento pendente na assinatura do seu cartão mais você.
                                    Regularize já seu pagamento e não perca todas as vantagens, descontos e novidades do Cartão Mais Você.
                                    Entre em sua conta de usuário ou contate nossa equipe via whatsapp ou email para regularizar seus pagamentos."</p>
                            </div>
                        </div>
                        <br/>
                        <button className={styles.button} type="submit">
                            Enviar mensagem via whatsapp
                        </button>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
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