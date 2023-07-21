
import { useEffect, useState } from 'react';
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useRouter } from 'next/router';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './userpayments.module.scss';
import Link from 'next/link';
import { MdCancel, MdCheckCircle, MdCheckCircleOutline, MdPending } from 'react-icons/md';
import imgpadrao from '../../../public/images/perfilpadrao.png';
import Image from 'next/image';


export default function Payments() {

    const router = useRouter();
    const { userid } = router.query;

    const [paymentsList, setPaymentsList] = useState([]);
    const [userValue, setUserValue] = useState({});

    const [filterValues, setFilterValues] = useState({
        userid: userid || '',
    });

    useEffect(() => {
        getListaPagamentos();
        getUsuario();
    }, [])

    const getListaPagamentos = async () => {
        try {
            filterValues.userid = userid;
            const response = await api.post('/api/pagamentos/getbyfilter', filterValues)
            const result = (response).data;
            console.log(result);
            setPaymentsList(result.payments)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsuario = async () => {
        try {
            const responseUser = await api.get(`/api/usuarios/${userid}`)
            const resultUser = (responseUser).data;
            console.log(resultUser);
            setUserValue(resultUser);
        } catch (error) {
            console.log(error)
        }
    }

    const cpfMask = value => {
        if (!value) return ""
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    const phoneMask = (value) => {
        if (!value) return ""
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2")
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
                        <div className={styles.cardt}>
                            <div className={styles.cardphoto}>
                                <Image
                                    className={styles.imgphoto}
                                    src={userValue.banner ? userValue.banner : imgpadrao}
                                    alt=''
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className={styles.cardtitular}>
                                <span className={styles.cardtitulartitle}>
                                    Cliente do cartão Nº: {userValue.cardNumber}
                                </span>
                                <div className={styles.cardtitularinfo}>
                                    <div className={styles.cardtitulargrouplabel}>
                                        <label className={styles.formlabel} htmlFor="nome">Nome:</label><span className={styles.formlabelvalue}>{userValue.username}</span>
                                    </div>
                                    <div className={styles.cardtitulargrouplabel}>
                                        <label className={styles.formlabel} htmlFor="email">Email:</label><span className={styles.formlabelvalue}>{userValue.email}</span>
                                    </div>
                                    <div className={styles.cardtitulargrouplabel}>
                                        <label className={styles.formlabel} htmlFor="cpf">Cpf:</label><span className={styles.formlabelvalue}>
                                            {userValue.cpf &&
                                                cpfMask(userValue.cpf)
                                            }
                                        </span>
                                    </div>
                                    <div className={styles.cardtitulargrouplabel}>
                                        <label className={styles.formlabel} htmlFor="phone">Telefone:</label><span className={styles.formlabelvalue}>
                                            {userValue.phone &&
                                                phoneMask(userValue.phone)
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {paymentsList.map((item, i) => (
                            <div className={styles.card} key={item.id}>
                                <div className={styles.cardpayments}>

                                    {item.status == 'CONFIRMED' &&
                                        <MdCheckCircle className={styles.iconconfirmed} />
                                    }

                                    {item.status == 'RECEIVED' &&
                                        <MdCheckCircle className={styles.iconreceived} />
                                    }

                                    {item.status == 'PENDING' &&
                                        <MdPending className={styles.iconpending} />
                                    }

                                    {item.status == 'OVERDUE' &&
                                        <MdCancel className={styles.iconoverdue} />
                                    }

                                    <span className={styles.paymentstatus}>{showStatus(item.status)}</span>
                                    <span className={styles.paymenttype}>{showType(item.type)}</span>
                                    <span className={styles.paymentvalue}>R${showValue(item.value)}</span>
                                    <Link href={`/payment?paymentid=${item.id}&userid=${userid}`} className={styles.btpayments}>
                                        Gerenciar pagamento
                                    </Link>
                                </div>
                            </div>
                        ))}
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