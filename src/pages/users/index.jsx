import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    cardnumber: '',
    username: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    paymentstatus: ''
  });

  const handleFilterSubmit = async () => {
    // Lógica para lidar com o envio dos filtros
    // ...
    console.log(filterValues);
    //const response = await api.post('/api/usuarios/getbyfilter', filterValues)
    //const result = (response).data;
    //setuserList(result.users)
    //console.log(result)
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
    console.log("entrei aquiii")
    getListaUsuarios();
  }, []);

  const getListaUsuarios = async () => {
    const response = await api.get('/api/usuarios/')
    const result = (response).data;
    setuserList(result.users)
    console.log(result)
  }

  const deleteUsuarios = async () => {
    const response = await api.delete(`/api/usuarios/${selectedUserId}`)
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
                    <label className={styles.formlabel} htmlFor="cardnumber">Nº Cartão:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Nº cartão"
                      value={filterValues.cardnumber}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, cardnumber: e.target.value })
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
                      <option value="1">Quitado</option>
                      <option value="2">Pendente</option>
                      <option value="3">Atrasado</option>
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
                  <button className={styles.button} onClick={() => setIsFilterOpen(!isFilterOpen)}>Limpar</button>
                    <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                    <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                  </div>
                </div>
              )}

            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>12</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsgreen}></div>
                    <span className={styles.carddescription}>Ativos</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>34</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsorange}></div>
                    <span className={styles.carddescription}>Pendentes</span>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>56</span>
                  <div className={styles.ctactives}>
                    <div className={styles.dotsred}></div>
                    <span className={styles.carddescription}>Atrasados</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.headtable}>
              <Link href='/newuser' className={styles.btnewuser}>Novo usuário</Link>

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
                  <th className={styles.th}>Endereço</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.tdcenter}>{user.cardNumber}</td>
                    <td className={styles.tdcenter}>{user.username}</td>
                    <td className={styles.tdcenter}>{user.cpf}</td>
                    <td className={styles.tdcenter}>{user.email}</td>
                    <td className={styles.tdcenter}>
                      <div className={styles.containerdots}>
                        <div className={(user.paymentstatus == '1') ? styles.dotsgreen : (user.paymentstatus == '2') ? styles.dotsorange : styles.dotsred}></div>
                      </div>
                    </td>
                    <td className={styles.tdcenter}>{user.phone}</td>
                    <td className={styles.tdcenter}>{user.address}</td>
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

