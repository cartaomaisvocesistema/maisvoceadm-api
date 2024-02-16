import React, { useState, useContext, useEffect } from "react";
import Link from 'next/link';

import { parseCookies } from "nookies";

import LayoutDashboard from "@/layouts/LayoutDashboard";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import styles from './payments.module.scss';

export default function Payments() {

  const [userList, setuserList] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    cardNumber: '',
    username: '',
    paymentstatus: '',
    type: 'C_TITULAR'
  });

  useEffect(() => {
    getListaUsuarios();
  }, [])

  const handleFilterClear = async () => {
    try {
      filterValues.username = '';
      filterValues.cardNumber = '';
      filterValues.paymentstatus = '';
      filterValues.type = 'C_TITULAR';
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
      setIsFilterOpen(!isFilterOpen)
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterSubmit = async () => {
    try {
      filterValues.type = 'C_TITULAR';
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
      setIsFilterOpen(!isFilterOpen);
    } catch (error) {
      console.log(error);
    }
  };

  /*const getListaUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios/')
      const result = (response).data;
      setuserList(result.users.filter(user => user.type !== 'ADM'))
    } catch (error) {
      console.log(error);
    }
  }*/

  const getListaUsuarios = async () => {
    try {
      filterValues.type = 'C_TITULAR';
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Pagamentos</span>
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
                    <label className={styles.formlabel} htmlFor="paymenttype1">Status de pagamento:</label>
                    <select
                      className={styles.forminputtext}
                      id="paymenttype1"
                      name="paymenttype1"
                      value={filterValues.paymentstatus}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, paymentstatus: e.target.value })
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="EM_DIA">Em dia</option>
                      <option value="ATRASADO">Atrasado</option>
                    </select>
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
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Pagamentos</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdcenter}>{user.cardNumber}</td>
                    <td className={styles.tdcenter}>{user.username}</td>
                    <td className={styles.tdcenter}>
                      <div className={(user.paymentstatus === 'EM_DIA') ? styles.dotsgreen : (user.paymentstatus === 'ATRASADO') ? styles.dotsred : styles.nodots}>
                        {(user.paymentstatus !== 'EM_DIA' && user.paymentstatus !== 'ATRASADO') && 'NCF'}
                      </div>
                    </td>
                    <td className={styles.tdcenter}>
                      <Link href={`/userpayments?userid=${user.id}`} className={styles.btseepayments}>
                        Ver pagamentos
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </LayoutDashboard>
      </main>
    </>
  );
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