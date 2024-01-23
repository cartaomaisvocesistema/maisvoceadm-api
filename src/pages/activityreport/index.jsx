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

    const [activityList, setactivityList] = useState([]);

    const cpfMask = value => {
        if (!value) return ""
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    useEffect(() => {
        getListaUsuarios();
    }, []);

    const getListaUsuarios = async () => {
        try {
            const response = await api.get('/api/usuarios/activitylist/getall')
            const result = (response).data;
            setactivityList(result.activities)
        } catch (error) {
            console.log(error)
        }
    }


    return (<>
        <LayoutDashBoard>
            <div className={styles.container}>
                <div className={styles.topbar}>
                    <span className={styles.topbartitle}>Relatório de Atividades</span>
                </div>
                <div className={styles.ctusertitle}>
                    Histórico de Atividades de Administrador
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tr}>
                            <th className={styles.th}>Nome do administrador</th>
                            <th className={styles.th}>Nome do Cliente</th>
                            <th className={styles.th}>Tipo de Atividade</th>
                            <th className={styles.th}>Data de atividade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityList.map((activity) => (
                            <tr key={activity.id} className={styles.tr}>
                                <td className={styles.tdcenter}>{activity.admName}</td>
                                <td className={styles.tdcenter}>{activity.activityUserName}</td>
                                <td className={styles.tdcenter}>{activity.activityType}</td>
                                <td className={styles.tdcenter}>{activity.activityDate}</td>
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