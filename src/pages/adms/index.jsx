import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsPersonFillGear } from "react-icons/bs";
import { useEffect } from 'react';

import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './adms.module.scss';

export default function Users() {

  const [userList, setuserList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    cardNumber: '',
    username: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    paymentstatus: ''
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

  const handleFilterSubmit = async () => {
    try {
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
      setIsFilterOpen(!isFilterOpen);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterClear = async () => {
    try {
      filterValues.username = '';
      filterValues.cardNumber = '';
      filterValues.cpf = '';
      filterValues.email = '';
      filterValues.phone = '';
      filterValues.address = '';
      filterValues.paymentstatus = '';

      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
      setIsFilterOpen(!isFilterOpen)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    await deleteUsuarios();
    await getListaUsuarios();
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    getListaUsuarios();
  }, []);

  const getListaUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios/admlist')
      const result = response.data;
      setuserList(result.users)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUsuarios = async () => {
    try {
      const response = await api.delete(`/api/usuarios/${selectedUserId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Usuários</span>
            </div>
            <div>
              {isFilterOpen && (
                <div className={styles.filterbox}>
                  
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
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Email"
                      value={filterValues.email}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, email: e.target.value })
                      }
                    />
                  </div>

                  {/*<div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cpf">CPF:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="CPF"
                      value={filterValues.cpf}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, cpf: e.target.value })
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
              <Link href='/newadm' className={styles.btnewuser}>Novo administrador</Link>
              {/*<button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>*/}
            </div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>CPF</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdcenter}>{user.username}</td>
                    <td className={styles.tdcenter}>{cpfMask(user.cpf)}</td>
                    <td className={styles.tdcenter}>{user.email}</td>
                    <td className={`${styles.tdcenter} ${styles.tdcenter}`}>
                      <Link href={`/edituser?id=${user.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <RiDeleteBinLine onClick={() => {
                        setSelectedUserId(user.id);
                        setIsModalOpen(true);
                      }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Excluir Usuário</h2>
                  <p>Deseja realmente excluir este usuário?</p>
                  <div className={styles.modalButtons}>
                    <button onClick={handleDeleteUser}>Excluir</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
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

