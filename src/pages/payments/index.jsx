import React, { useState, useContext, useEffect } from "react";
import Link from 'next/link';

import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { parseCookies } from "nookies";

import { AuthContext } from '@/contexts/AuthContext';
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import styles from './payments.module.scss';

export default function Payments() {

  const [userList, setuserList] = useState([]);

  /*const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);*/
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    cardNumber: '',
    username: '',
    paymentstatus: ''
  });

  /*const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);*/

  useEffect(() => {
    getListaUsuarios();
  }, [])

  const handleFilterClear = async () => {
    filterValues.username = '';
    filterValues.cardNumber = '';
    filterValues.paymentstatus = '';

    const response = await api.post('/api/usuarios/getbyfilter', filterValues)
    const result = (response).data;
    setuserList(result.users)
    setIsFilterOpen(!isFilterOpen)
  };

  const handleFilterSubmit = async () => {
    const response = await api.post('/api/usuarios/getbyfilter', filterValues)
    const result = (response).data;
    setuserList(result.users)
    setIsFilterOpen(!isFilterOpen);
  };

  /*const handleFilterSubmit = async () => {
    const response = await api.post('/api/pagamentos/getbyfilter', filterValues)
    const result = (response).data;
    setPaymentsList(result.payments)
    setIsFilterOpen(!isFilterOpen);
  };*/

  const getListaUsuarios = async () => {
    const response = await api.get('/api/usuarios/')
    const result = (response).data;
    setuserList(result.users.filter(user => user.type !== 'ADM'))
  }

  /*const handleDeletePayment = (paymentId) => {
    setPaymentToDelete(paymentId);
    setShowConfirmationModal(true);
  };

  const confirmDeletePayment = () => {
    if (paymentToDelete) {
      const updatedPayments = payments.filter(payment => payment.id !== paymentToDelete);
      setPayments(updatedPayments);
      setShowConfirmationModal(false);
      setPaymentToDelete(null);
    }
  };

  const cancelDeletePayment = () => {
    setShowConfirmationModal(false);
    setPaymentToDelete(null);
  };*/

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

                  {/*<div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="usuario">Usuário:</label>
                    <select
                      className={styles.forminputtext}
                      value={filterValues.usuario}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, usuario: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="usuario1">Usuário 1</option>
                      <option value="usuario2">Usuário 2</option>
                      <option value="usuario3">Usuário 3</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="status">Status:</label>
                    <select
                      className={styles.forminputtext}
                      value={filterValues.status}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, status: e.target.value })
                      }
                    >
                      <option value="">Todos</option>
                      <option value="quitado">Quitado</option>
                      <option value="pendente">Pendente</option>
                      <option value="atrasado">Atrasado</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="valor">Valor:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Valor"
                      value={filterValues.valor}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, valor: e.target.value })
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
            {/*<div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>0</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.carddescription}>Pagamentos em Aberto</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>0</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsred}></div>
                    <span className={styles.carddescription}>Pagamentos Vencidos</span>
                  </div>
                </div>
              </div>
                    </div>*/}

            <div className={styles.headtable}>
              {/*<Link href='/newpayment' className={styles.btnewuser}>Novo pagamento</Link>*/}
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
                      <div className={styles.containerdots}>
                        <div className={(user.paymentstatus == 'EM_DIA') ? styles.dotsgreen : styles.dotsred}></div>
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

            {/*{showConfirmationModal && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h3>Confirmar exclusão</h3>
                  <p>Deseja realmente excluir este pagamento?</p>
                  <div className={styles.modalButtons}>
                    <button className={styles.confirmButton} onClick={confirmDeletePayment}>Confirmar</button>
                    <button className={styles.cancelButton} onClick={cancelDeletePayment}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}*/}
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