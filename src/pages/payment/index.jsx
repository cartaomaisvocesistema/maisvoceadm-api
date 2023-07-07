
import { useEffect, useState } from 'react';
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useRouter } from 'next/router';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './payment.module.scss';
import Link from 'next/link';
import { MdCancel, MdCheckCircle, MdCheckCircleOutline, MdPending } from 'react-icons/md';


export default function Payment() {

    const router = useRouter();
    const { paymentid, userid } = router.query;

    const [paymentValue, setPaymentValue] = useState([]);
    const [userValue, setUserValue] = useState({});


    useEffect(() => {
        getListaPagamento();
    }, [])

    const getListaPagamento = async () => {
        try {
            const responsePayment = await api.get(`/api/pagamentos/${paymentid}`)
            const resultPayment = (responsePayment).data;
            console.log(resultPayment);
            setPaymentValue(resultPayment);
            const responseUser = await api.get(`/api/usuarios/${userid}`)
            const resultUser = (responseUser).data;
            console.log(resultUser);
            setUserValue(resultUser);

        } catch (error) {
            console.log(error)
        }
    }

    const showStatus = (status) => {
        const obj = {
            CONFIRMED: 'Confirmado',
            PENDING: 'Aguardando pagamento',
            RECEIVED: 'Recebido',
            OVERDUE: 'Vencido'
        }
        return obj[status] || ''
    }

    const showType = (type) => {
        const obj = {
            CREDIT_CARD: 'Cartão de crédito',
            BOLETO: 'Boleto',
            UNDEFINED: 'Escolha do cliente'
        }
        return obj[type] || ''
    }

    const showValue = (value) => {
        return parseFloat(value).toFixed(2).replace('.', ',');
    }

    return (<>
        <main>
            <LayoutDashboard>
                <div className={styles.container}>
                    <div className={styles.topbar}>
                        <span className={styles.topbartitle}>Pagamentos</span>
                    </div>
                    <div className={styles.containercards}>
                        <div className={styles.card}>
                            <div className={styles.cardpayment}>
                                <div className={styles.cardpaymenttop}>
                                    <div className={styles.cardpaymentstatus}>
                                        {paymentValue.status == 'CONFIRMED' &&
                                            <MdCheckCircle className={styles.iconconfirmed} />
                                        }

                                        {paymentValue.status == 'RECEIVED' &&
                                            <MdCheckCircle className={styles.iconreceived} />
                                        }

                                        {paymentValue.status == 'PENDING' &&
                                            <MdPending className={styles.iconpending} />
                                        }

                                        {paymentValue.status == 'OVERDUE' &&
                                            <MdCancel className={styles.iconoverdue} />
                                        }
                                    </div>
                                    <div className={styles.cardpaymentvalue}>
                                        R${showValue(paymentValue.value)}
                                    </div>
                                    <div className={styles.cardpaymentstatus2}>
                                       
                                    </div>
                                </div>
                                <div className={styles.cardpaymentmid}>
                                    <span className={styles.cardpaymentlabel}><b>Nome do cliente: </b>{userValue.username}</span>
                                    <span className={styles.cardpaymentlabel}><b>Cpf: </b>{userValue.cpf}</span>
                                    <span className={styles.cardpaymentlabel}><b>Email: </b>{userValue.email}</span>
                                    <span className={styles.cardpaymentlabel}><b>Data to pagamento: </b>{paymentValue.paymentdate}</span>
                                    <span className={styles.cardpaymentlabel}><b>Tipo de pagamento: </b>{paymentValue.type}</span>
                                </div>
                                <div className={styles.cardpaymentbottom}>
                                    <Link href={`/`} className={styles.btpayments}>
                                        Ir para pagamento
                                    </Link>
                                    <Link href={`/`} className={styles.btpayments}>
                                        Ver boleto
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </LayoutDashboard>
        </main>
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
    return {
        props: {}
    }
}