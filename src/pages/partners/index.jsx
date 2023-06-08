import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './partners.module.scss';

export default function Partners() {
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

  const partners = [
    {
      id: 1,
      nome: 'Empresa A',
      descricao: 'Lorem ipsum dolor sit amet',
      email: 'empresaA@example.com',
      telefone: '1234567890',
      endereco: 'Rua A, 123',
      website: 'https://empresaA.com',
      periodo: '2023-06-01 - 2023-06-30',
      categoria: 'Saúde',
    },
    {
      id: 2,
      nome: 'Empresa B',
      descricao: 'Lorem ipsum dolor sit amet',
      email: 'empresaB@example.com',
      telefone: '0987654321',
      endereco: 'Rua B, 456',
      website: 'https://empresaB.com',
      periodo: '2023-06-01 - 2023-06-30',
      categoria: 'Comércio',
    },
    // Adicione mais parceiros aqui
  ];


  const { user } = useContext(AuthContext)

  useEffect(() => {
    //api.get('/users')
  }, [])


  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.orangebar}></div>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Parceiros</span>
            </div>

            <div className={styles.headtable}>
              <div className={styles.ctpainel}>
                <Link href='/newpartner' className={styles.btnewuser}>Novo parceiro</Link>

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
                  <th className={styles.th}>Descrição</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Telefone</th>
                  <th className={styles.th}>Endereço</th>
                  <th className={styles.th}>Website</th>
                  <th className={styles.th}>Período</th>
                  <th className={styles.th}>Categoria</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => (
                  <tr key={partner.id} className={styles.tr}>
                    <td className={styles.td}>{partner.nome}</td>
                    <td className={styles.td}>{partner.descricao}</td>
                    <td className={styles.td}>{partner.email}</td>
                    <td className={styles.td}>{partner.telefone}</td>
                    <td className={styles.td}>{partner.endereco}</td>
                    <td className={styles.td}>{partner.website}</td>
                    <td className={styles.td}>{partner.periodo}</td>
                    <td className={styles.td}>{partner.categoria}</td>
                    <td className={`${styles.td} ${styles.tdcenter}`}><FaEdit/></td>
                    <td className={`${styles.td} ${styles.tdcenter}`}><RiDeleteBinLine/></td>
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
                    <label className={styles.formlabel} htmlFor="descricao">Descrição:</label>
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
                      placeholder="Nome"
                      value={filterValues.name}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="telefone">Telefone:</label>
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
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
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
                  <div className={styles.ctbuttons}>
                    <button className={styles.buttongray} onClick={() => setIsFilterOpen(!isFilterOpen)}>Cancelar</button>
                    <button className={styles.button} onClick={handleFilterSubmit}>Filtrar</button>
                  </div>
                </div>
              )}

            </div>

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