import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsPersonFillGear } from "react-icons/bs";
import { useContext, useEffect } from 'react';

import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './paymentsreport.module.scss';
import { Chart } from "react-google-charts";


export default function PaymentsReport() {

    const [reportData, setReportData] = useState({});

    const [options2, setOptions2] = useState({
        title: 'Status de pagamento ( % )',
        slices: {
            0: { color: 'orange' },
            1: { color: 'green' },
            2: { color: 'red' }
        }
    })

    const [data2, setData2] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ])

    const [options3, setOptions3] = useState({
        title: 'Tipo de plano ( % )',
        slices: {
            0: { color: '#191b3c' },
            1: { color: '#c2522b' }
        }
    })

    const [data3, setData3] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ])

    const [paymentList, setPaymentList] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filterValues, setFilterValues] = useState({
        type: '',
        status: '',
        value: '',
        paymentdate: ''
    });

    const handleFilterSubmit = async () => {
        try {
            console.log(filterValues)
            const response = await api.post('/api/pagamentos/getbyfilter', filterValues)
            const result = (response).data;
            setPaymentList(result.payments)
            setIsFilterOpen(!isFilterOpen);
        } catch (error) {
            console.log(error)
        }
    };

    const handleFilterClear = async () => {
        try {
            filterValues.type = '';
            filterValues.status = '';
            filterValues.value = '';
            filterValues.paymentdate = '';

            const response = await api.post('/api/pagamentos/getbyfilter', filterValues)
            const result = (response).data;
            setPaymentList(result.payments)
            setIsFilterOpen(!isFilterOpen)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getListaPagamentos();
        getListaCardHeaders();
    }, []);

    const getListaPagamentos = async () => {
        try {
            const response = await api.get('/api/pagamentos/')
            const result = (response).data;
            setPaymentList(result.payments);
        } catch (error) {
            console.log(error)
        }
    }

    const getListaCardHeaders = async () => {
        try {
            const response = await api.get('/api/pagamentos/paymentcardsheaders/info')
            const result = response.data;

            setReportData(result);

            const d2 = [
                ['Status', 'Quantidade'],
                ['Pendentes', result.pendentes],
                ['Quitados', result.quitados],
                ['Atrasados', result.atrasados]
            ];

            const d3 = [
                ['Status', 'Quantidade'],
                ['Padrão', result.standard],
                ['Plus', result.plus]
            ];

            setData2(d2);
            setData3(d3);
        } catch (error) {
            console.log(error);
        }
    }

    const showType = (type) => {
        const obj = {
            CREDIT_CARD: 'Cartão de crédito',
            BOLETO: 'Boleto',
            UNDEFINED: 'Balcão'
        }
        return obj[type] || ''
    }

    const showStatus = (type) => {
        const obj = {
            CONFIRMED: 'Confirmado',
            PENDING: 'Aguardando pagamento',
            OVERDUE: 'Atrasado',
            RECEIVED: 'Recebido',
            RECEIVED_IN_CASH: 'Recebido no balcão'
        }
        return obj[type] || ''
    }

    const showValue = (value) => {
        return parseFloat(value).toFixed(2).replace('.', ',');
    }

    return (<>
        <LayoutDashBoard>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <span className={styles.topbartitle}>Relatório de pagamentos</span>
                </div>
                <div className={styles.containercards}>
                    <div className={styles.card}>
                        <div className={styles.carduserstitle}>Dados gerais</div>
                        <div className={styles.cardusers1}>
                            <div className={styles.cardusersleft1}>
                                <div className={styles.subcard1}>
                                    <div className={styles.carduserslabel}>Valor total:</div>
                                    <div className={styles.carduserslabelinfo1}>R${showValue(reportData.valorTotal)}</div>
                                </div>
                                <div className={styles.subcard1}>
                                    <div className={styles.carduserslabel}>Valor quitados:</div>
                                    <div className={styles.carduserslabelinfo1}>R${showValue(reportData.valorQuitados)}</div>
                                </div>
                                <div className={styles.subcard1}>
                                    <div className={styles.carduserslabel}>Valor pendentes:</div>
                                    <div className={styles.carduserslabelinfo1}>R${showValue(reportData.valorPendentes)}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.carduserstitle}>Status de pagamento</div>
                        <div className={styles.cardusers}>
                            <div className={styles.cardusersleft}>
                                <div>
                                    <div className={styles.subcard}>
                                        <div className={styles.carduserslabel}>Total:</div>
                                        <div className={styles.carduserslabelinfo}>{reportData.totalNumber}</div>
                                    </div>
                                    <div className={styles.subcard}>
                                        <div className={styles.carduserslabel}>Quitados:</div>
                                        <div className={styles.carduserslabelinfo}>{reportData.quitados}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.subcard}>
                                        <div className={styles.carduserslabel}>Pendentes:</div>
                                        <div className={styles.carduserslabelinfo}>{reportData.pendentes}</div>
                                    </div>
                                    <div className={styles.subcard}>
                                        <div className={styles.carduserslabel}>Atrasados:</div>
                                        <div className={styles.carduserslabelinfo}>{reportData.atrasados}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardusersright}>
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    data={data2}
                                    options={options2}
                                />
                            </div>
                        </div>
                        <div className={styles.carduserstitle}>Tipo de plano</div>
                        <div className={styles.cardusers}>
                            <div className={styles.cardusersleft}>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Padrão:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.standard}</div>
                                </div>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Plus:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.plus}</div>
                                </div>
                            </div>
                            <div className={styles.cardusersright}>
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    data={data3}
                                    options={options3}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.ctusertitle}>
                    Histórico de pagamentos
                </div>
                <div>
                    {isFilterOpen && (
                        <div className={styles.filterbox}>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="type">Tipo:</label>
                                <select
                                    className={styles.forminputtext}
                                    id="type"
                                    name="type"
                                    value={filterValues.type}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, type: e.target.value })
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="CREDIT_CARD">Cartão de Crédito</option>
                                    <option value="BOLETO">Boleto</option>
                                    <option value="UNDEFINED">Balcão</option>
                                </select>
                            </div>


                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="status">Status do pagamento:</label>
                                <select
                                    className={styles.forminputtext}
                                    id="status"
                                    name="status"
                                    value={filterValues.status}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, status: e.target.value })
                                    }
                                >
                                    <option value="">Selecione</option>
                                    <option value="CONFIRMED">Confirmado</option>
                                    <option value="PENDING">Aguardando pagamento</option>
                                    <option value="RECEIVED">Recebido</option>
                                    <option value="RECEIVED_IN_CASH">Recebido no balcão</option>
                                    <option value="OVERDUE">Atrasado</option>
                                </select>
                            </div>

                            {/*<div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="value">Valor:</label>
                                <input
                                    className={styles.forminputtext}
                                    type="text"
                                    placeholder="Valor"
                                    value={filterValues.value}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, value: e.target.value })
                                    }
                                />
                                </div>*/}

                            <div className={styles.ctbuttons}>
                                <button className={styles.button} onClick={handleFilterClear}>Limpar</button>
                                <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                                <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.headtable}>
                    <button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Tipo</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Valor</th>
                            <th className={styles.th}>Data do pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentList.map((payment) => (
                            <tr key={payment.id} className={styles.tr}>
                                <td className={styles.tdcenter}>{showType(payment.type)}</td>
                                <td className={styles.tdcenter}>
                                    {showStatus(payment.status)}
                                </td>
                                <td className={styles.tdcenter}>R${showValue(payment.value)}</td>
                                <td className={styles.tdcenter}>{payment.paymentdate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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