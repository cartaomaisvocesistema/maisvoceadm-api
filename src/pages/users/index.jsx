import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './users.module.scss';

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    name: '',
    email: '',
    cpf: '',
  });
  const handleFilterSubmit = () => {
    // Lógica para lidar com o envio dos filtros
    // ...
  };
  const handleDeleteUser = () => {
    // Remova o usuário da lista com base no selectedUserId
    // Por exemplo:
    const updatedUsers = users.filter(user => user.id !== selectedUserId);
    setUsers(updatedUsers);

    // Feche a modal e redefina o ID do usuário selecionado
    setIsModalOpen(false);
    setSelectedUserId(null);
  };


  const { user } = useContext(AuthContext)

  useEffect(() => {
    //api.get('/users')
  }, [])

  const users = [
    {
      id: 1,
      name: 'João',
      email: 'joao@example.com',
      cpf: '123.456.789-00',
      status: 'Ativo',
      lastPaymentDate: '01/05/2023',
    },
    {
      id: 2,
      name: 'Rodrigo',
      email: 'rodrigo@example.com',
      cpf: '123.454.789-10',
      status: 'Ativo',
      lastPaymentDate: '01/06/2023',
    },
    {
      id: 3,
      name: 'Alexandre',
      email: 'alexandre@example.com',
      cpf: '123.454.789-10',
      status: 'Ativo',
      lastPaymentDate: '01/06/2023',
    }
    // Adicione mais usuários aqui
  ];

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Usuários</span>
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
              <div className={styles.ctpainel}>
                <Link href='/newuser' className={styles.btnewuser}>Novo usuário</Link>

                <button className={styles.btfilter} onClick={() => setIsFilterOpen(!isFilterOpen)}>Filtros</button>

              </div>

              <div className={styles.pagination}>
                <Link href=''>
                  <IoIosArrowBack />
                </Link>
                <span className={styles.paginationnumber}>1</span>
                <Link href=''>
                  <IoIosArrowForward />
                </Link>
              </div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>CPF</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Data do Último Pagamento</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={styles.tr}>
                    <td className={styles.td}>{user.name}</td>
                    <td className={styles.td}>{user.email}</td>
                    <td className={styles.td}>{user.cpf}</td>
                    <td className={styles.td}>{user.status}</td>
                    <td className={styles.td}>{user.lastPaymentDate}</td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
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
            <div>
              {isFilterOpen && (
                <div className={styles.filterbox}>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      placeholder="Nome"
                      value={filterValues.name}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, name: e.target.value })
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
                  </div>
                  
                  <div className={styles.ctbuttons}>
                    <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                    <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                  </div>
                </div>
              )}

            </div>
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