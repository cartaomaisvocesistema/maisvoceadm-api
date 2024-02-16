import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsPersonFillGear } from "react-icons/bs";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './users.module.scss';

export default function Users() {

  const [userList, setuserList] = useState([]);
  const [EmDiaQtdValue, setEmDiaQtdValue] = useState(null);
  const [AtrasadoQtdValue, setAtrasadoQtdValue] = useState(null);
  const [deleteReason, setDeleteReason] = useState(''); // Adicionado estado para a razão

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSelectedUserOpen, setIsSelectedUserOpen] = useState(false);
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

  const phoneMask = (value) => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
  }

  const getByFilter = async () => {
    try {
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
    } catch (error) {
      console.log(error);
    }
  };

  const filterEmdia = async () => {
    try {
      setFilterValues({ ...filterValues, paymentstatus: 'EM_DIA' })
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
    } catch (error) {
      console.log(error);
    }
  };

  const filterAtrasado = async () => {
    try {
      setFilterValues({ ...filterValues, paymentstatus: 'ATRASADO' })
      const response = await api.post('/api/usuarios/getbyfilter', filterValues)
      const result = (response).data;
      setuserList(result.users)
    } catch (error) {
      console.log(error);
    }
  };

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
    // Remova o usuário da lista com base no selectedUserId
    // Por exemplo:
    await deleteUsuarios();
    await getListaUsuarios();

    // Feche a modal e redefina o ID do usuário selecionado

    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    getListaUsuarios();
    getListaCardHeaders();
  }, []);

  const getListaUsuarios = async () => {
    try {
      const response = await api.get('/api/usuarios/')
      const result = (response).data;
      setuserList(result.users.filter(user => user.type !== 'ADM'))
    } catch (error) {
      console.log(error);
    }
  }

  const getListaCardHeaders = async () => {
    try {
      const response = await api.get('/api/usuarios/usercardsheaders/info')
      const result = (response).data;
      setEmDiaQtdValue(result.emDiaNumber);
      setAtrasadoQtdValue(result.atrasadoNumber);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUsuarios = async () => {
    try {
      const response = await api.delete(`/api/usuarios/${selectedUserId}`, {
        data: { reason: deleteReason },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsSelectedUserOpen(true);
  };

  const showType = (type) => {
    const obj = {
      C_TITULAR: 'Titular',
      C_DEPENDENTE_GRATUITO: 'Gratuito',
      C_DEPENDENTE_EXTRA: 'Extra'
    }
    return obj[type] || ''
  }

  const showAgreementType = (type) => {
    const obj = {
      STANDARD: 'Padrão',
      PLUS: 'Plus'
    }
    return obj[type] || ''
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

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Telefone"
                      value={filterValues.phone}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Endereço"
                      value={filterValues.address}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, address: e.target.value })
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
            {isSelectedUserOpen && (
              <div className={styles.selectedusermodal}>
                <div className={styles.selectedusermodalcontent}>
                  <div className={styles.ctselecteduser}>
                    <p><b>Nº Cartão:</b> {selectedUser.cardNumber}</p>
                    <p><b>Nome:</b> {selectedUser.username}</p>
                    <p><b>CPF:</b> {cpfMask(selectedUser.cpf)}</p>
                    <p><b>Email:</b> {selectedUser.email}</p>
                    <p><b>Telefone:</b> {selectedUser.phone}</p>
                    <p><b>Endereço:</b> {selectedUser.address}</p>
                    <p><b>Tipo:</b> {showType(selectedUser.type)}</p>
                    <p><b>Plano:</b> {showAgreementType(selectedUser.agreementType)}</p>
                  </div>
                  <div className={styles.ctbuttons}>
                    <button className={styles.buttongray} onClick={() => setIsSelectedUserOpen(!isSelectedUserOpen)}>Fechar</button>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>{EmDiaQtdValue}</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.carddescription}>Em dia</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>{AtrasadoQtdValue}</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsred}></div>
                    <span className={styles.carddescription}>Atrasado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.headtable}>
              <Link href='/newuser' className={styles.btnewuser}>Novo usuário titular</Link>
              <button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>


              {/*<div className={styles.pagination}>
                <Link href=''>
                  <IoIosArrowBack />
                </Link>
                <span className={styles.paginationnumber}>1</span>
                <Link href=''>
                  <IoIosArrowForward />
                </Link>
                  </div>*/}
            </div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Nº Cartão</th>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>CPF</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Telefone</th>
                  <th className={styles.th}>Tipo</th>
                  <th className={styles.th}>Plano</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Dependentes</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{user.cardNumber}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{user.username}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{cpfMask(user.cpf)}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{user.email}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>
                      <div className={(user.paymentstatus === 'EM_DIA') ? styles.dotsgreen : (user.paymentstatus === 'ATRASADO') ? styles.dotsred : styles.nodots}>
                        {(user.paymentstatus === 'NAO_CONFIRMADO') && 'NCF'}
                        {(user.paymentstatus !== 'EM_DIA' && user.paymentstatus !== 'ATRASADO' && user.paymentstatus !== 'NAO_CONFIRMADO') && 'DEP'}
                      </div>
                    </td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{phoneMask(user.phone)}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{showType(user.type)}</td>
                    <td className={styles.tdcenter} onClick={() => handleRowClick(user)}>{showAgreementType(user.agreementType)}</td>
                    <td className={`${styles.tdcenter} ${styles.tdcenter}`}>
                      <Link href={`/edituser?id=${user.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.tdcenter} ${styles.tdcenter}`}>
                      <Link href={`/dependents?cardnumber=${user.cardNumber}`}>
                        <BsPersonFillGear />
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
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="partnerdescription">
                      Motivo de exclusão de usuário:
                    </label>
                    <textarea
                      className={`${styles.forminputtext} ${styles.forminputtextarea}`}
                      id="partnerdescription"
                      name="partnerdescription"
                      value={deleteReason}
                      maxLength='250'
                      onChange={e => setDeleteReason(e.target.value)}
                      required
                    />
                  </div>

                  {/* <input
                    type="text"
                    placeholder="Digite a razão da deleção"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                  /> */}
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

