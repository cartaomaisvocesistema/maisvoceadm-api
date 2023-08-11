
import { useEffect, useState } from 'react';

import { MdCancel, MdCheckCircle, MdPending } from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parseCookies } from "nookies";

import LayoutDashboard from "@/layouts/LayoutDashboard";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import styles from './payment.module.scss';

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
            const resultPayment = responsePayment.data;
            setPaymentValue(resultPayment);

            const responseUser = await api.get(`/api/usuarios/${userid}`)
            const resultUser = responseUser.data;
            setUserValue(resultUser);
        } catch (error) {
            console.log(error)
        }
    }

    const confirmPayment = async () => {
        try {
            const payment = {
                paymentid: paymentid
            }
            const responsePayment = await api.get(`/api/pagamentos/confirmpayment`, payment)
            if (responsePayment.status == 200) {
                alert('Pagamento confirmado');
                router.push(`/userpayments?userid=${userid}`);
            } else {
                alert('Erro ao confirmar pagamento.');
                router.push(`/userpayments?userid=${userid}`);
            }
        } catch (error) {
            alert('Erro ao confirmar pagamento.');
            router.push(`/userpayments?userid=${userid}`);
            console.log(error)
        }

    }

    /*const showStatus = (status) => {
        const obj = {
            CONFIRMED: 'Confirmado',
            PENDING: 'Aguardando pagamento',
            RECEIVED: 'Recebido',
            OVERDUE: 'Vencido'
        }
        return obj[status] || ''
    }*/

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
                                    <span className={styles.cardpaymentlabel}><b>Data do pagamento: </b>{paymentValue.paymentdate}</span>
                                    <span className={styles.cardpaymentlabel}><b>Tipo de pagamento: </b>{showType(paymentValue.type)}</span>
                                </div>
                                <div className={styles.cardpaymentbottom}>
                                    {(paymentValue.type === 'CREDIT_CARD' && paymentValue.linkcomprovanteasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkcomprovanteasas}`} className={styles.btpayments}>
                                            Ver comprovante
                                        </Link>
                                    }
                                    {(paymentValue.type === 'CREDIT_CARD' && paymentValue.linkpaymentasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkpaymentasas}`} className={styles.btpayments}>
                                            Ir para pagamento
                                        </Link>
                                    }

                                    {(paymentValue.type === 'BOLETO' && paymentValue.linkboletoasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkboletoasas}`} className={styles.btpayments}>
                                            Ver boleto
                                        </Link>
                                    }

                                    {(paymentValue.type === 'BOLETO' && paymentValue.linkpaymentasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkpaymentasas}`} className={styles.btpayments}>
                                            Ir para pagamento
                                        </Link>
                                    }

                                    {(paymentValue.type === 'UNDEFINED' && paymentValue.linkboletoasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkboletoasas}`} className={styles.btpayments}>
                                            Ver boleto
                                        </Link>
                                    }

                                    {(paymentValue.type === 'UNDEFINED' && paymentValue.linkpaymentasas)
                                        &&
                                        <Link target='_BLANK' href={`${paymentValue.linkpaymentasas}`} className={styles.btpayments}>
                                            Ir para pagamento
                                        </Link>
                                    }

                                    {(paymentValue.status === 'PENDING' || paymentValue.status === 'OVERDUE')
                                        &&
                                        <button target='_BLANK' onClick={confirmPayment} className={styles.btconfirmpayment}>
                                            Confirmar pagamento
                                        </button>
                                    }
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