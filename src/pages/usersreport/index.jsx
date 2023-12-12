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

import styles from './usersreport.module.scss';
import { Chart } from "react-google-charts";

export default function UsersReport() {

    const [reportData, setReportData] = useState({});

    const [options, setOptions] = useState({
        title: 'Status de pagamento ( % )',
        slices: {
            0: { color: 'green' },
            1: { color: 'red' }
        }
    })
    const [data, setData] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ])

    const [options2, setOptions2] = useState({
        title: 'Tipo de usuário ( % )',
        slices: {
            0: { color: 'green' },
            1: { color: 'red' }
        }
    })

    const [data2, setData2] = useState([
        ['Linguagens', 'Quantidade'],
        ['React', 100],
        ['Angula', 80],
        ['Vue', 50],
    ])

    const [userList, setuserList] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filterValues, setFilterValues] = useState({
        cardNumber: '',
        username: '',
        cpf: '',
        reasonForRemoval: ''
    });

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

    const handleFilterSubmit = async () => {
        try {
            const response = await api.post('/api/usuarios/getbyfilter', filterValues)
            const result = (response).data;
            setuserList(result.users)
            setIsFilterOpen(!isFilterOpen);
        } catch (error) {
            console.log(error)
        }
    };

    const handleFilterClear = async () => {
        try {
            filterValues.username = '';
            filterValues.cardNumber = '';
            filterValues.cpf = '';
            filterValues.reasonForRemoval = '';

            const response = await api.post('/api/usuarios/getbyfilter', filterValues)
            const result = (response).data;
            setuserList(result.users)
            setIsFilterOpen(!isFilterOpen)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getListaUsuarios();
        getListaCardHeaders();
    }, []);

    const getListaUsuarios = async () => {
        try {
            const response = await api.get('/api/usuarios/deletedusers')
            const result = (response).data;
            setuserList(result.users.filter(user => user.type !== 'ADM'))
        } catch (error) {
            console.log(error)
        }
    }

    const getListaCardHeaders = async () => {
        try {
            const response = await api.get('/api/usuarios/usercardsheaders/info')
            const result = response.data;

            setReportData(result);

            const d = [
                ['Status', 'Quantidade'],
                ['Em dia', result.emDiaNumber],
                ['Atrasado', result.atrasadoNumber]
            ];

            const d2 = [
                ['Status', 'Quantidade'],
                ['Titulares', result.titulares],
                ['Dependentes', result.dependentes]
            ];

            setData(d);
            setData2(d2);
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <LayoutDashBoard>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <span className={styles.topbartitle}>Relatório de usuários</span>
                </div>
                <div className={styles.containercards}>
                    <div className={styles.card}>
                        <div className={styles.carduserstitle}>Usuários (Status de pagamento)</div>
                        <div className={styles.cardusers}>
                            <div className={styles.cardusersleft}>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Total (Titulares):</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.totalNumberTitular}</div>
                                </div>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Em dia:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.emDiaNumber}</div>
                                </div>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Atrasados:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.atrasadoNumber}</div>
                                </div>
                            </div>
                            <div className={styles.cardusersright}>
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    data={data}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className={styles.carduserstitle}>Usuários (Tipo de usuário)</div>
                        <div className={styles.cardusers}>
                            <div className={styles.cardusersleft}>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Total de usuários:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.totalNumber}</div>
                                </div>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Titulares:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.titulares}</div>
                                </div>
                                <div className={styles.subcard}>
                                    <div className={styles.carduserslabel}>Dependentes:</div>
                                    <div className={styles.carduserslabelinfo}>{reportData.dependentes}</div>
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
                    </div>
                </div>
                <div className={styles.ctusertitle}>
                    Histórico de usuários Removidos
                </div>
                <div>
                    {isFilterOpen && (
                        <div className={styles.filterbox}>
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="cardNumber">Nº Cartão:</label>
                                <input
                                    className={styles.forminputtext}
                                    type="text"
                                    placeholder="Nº cartão"
                                    value={filterValues.cardNumber}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, cardNumber: e.target.value })
                                    }
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                                <input
                                    className={styles.forminputtext}
                                    type="text"
                                    placeholder="Nome"
                                    value={filterValues.username}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, username: e.target.value })
                                    }
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="nome">CPF:</label>
                                <input
                                    className={styles.forminputtext}
                                    type="text"
                                    placeholder="CPF"
                                    value={filterValues.cpf}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, cpf: e.target.value })
                                    }
                                />
                            </div>   
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel} htmlFor="nome">Motivo da Deleção do usuário:</label>
                                <input
                                    className={styles.forminputtext}
                                    type="text"
                                    placeholder="Motivo"
                                    value={filterValues.reasonForRemoval}
                                    onChange={(e) =>
                                        setFilterValues({ ...filterValues, reasonForRemoval: e.target.value })
                                    }
                                />
                            </div>                          

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
                            <th className={styles.th}>Nº Cartão</th>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>CPF</th>
                            <th className={styles.th}>Motivo da Deleção do usuário:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id} className={styles.tr}>
                                <td className={styles.tdcenter}>{user.cardNumber}</td>
                                <td className={styles.tdcenter}>{user.username}</td>
                                <td className={styles.tdcenter}>{cpfMask(user.cpf)}</td>
                                <td className={styles.tdcenter}>{user.reasonForRemoval}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </LayoutDashBoard >
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