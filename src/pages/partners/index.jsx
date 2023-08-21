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
import { api } from "@/services/api";

export default function Partners() {

  const [partnerList, setPartnerList] = useState([]);

  const { user } = useContext(AuthContext)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    partnername: '',
    categorypartner: ''
  });

  useEffect(() => {
    getListaParceiros();
  }, [])

  const phoneMask = (value) => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
  }

  const handleFilterSubmit = async () => {
    try {
      const response = await api.post('/api/parceiros/getbyfilter', filterValues)
      const result = (response).data;
      setPartnerList(result.partners)
      setIsFilterOpen(!isFilterOpen)
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterClear = async () => {
    try {
      filterValues.partnername = '';
      filterValues.categorypartner = '';

      const response = await api.post('/api/parceiros/getbyfilter', filterValues)
      const result = (response).data;
      setPartnerList(result.partners)
      setIsFilterOpen(!isFilterOpen)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePartner = async () => {
    await deleteParceiros();
    await getListaParceiros();
    setIsModalOpen(false);
    setSelectedPartnerId(null);
  };

  const getListaParceiros = async () => {
    try {
      const response = await api.get('/api/parceiros/')
      const result = (response).data;
      setPartnerList(result.partners)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteParceiros = async () => {
    try {
      const response = await api.delete(`/api/parceiros/${selectedPartnerId}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.orangebar}></div>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Parceiros</span>
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
                      value={filterValues.partnername}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, partnername: e.target.value })
                      }
                    />
                  </div>

                  {/*<div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="paymenttype1">Categoria:</label>
                    <select
                      className={styles.forminputtext}
                      id="category"
                      name="category"
                      value={filterValues.categorypartner}
                      onChange={(e) =>
                        setFilterValues({ ...filterValues, categorypartner: e.target.value })
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="1">Saúde</option>
                      <option value="2">Comérico</option>
                      <option value="2">Outros</option>
                    </select>
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
              <Link href='/newpartner' className={styles.btnewuser}>Novo parceiro</Link>

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
                  <th className={styles.th}>Nome</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Telefone</th>
                  <th className={styles.th}>Período</th>
                  <th className={styles.th}>Categoria</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {partnerList.map((partner) => (
                  <tr key={partner.id} className={styles.tr}>
                    <td className={styles.td}>{partner.partnername}</td>
                    <td className={styles.td}>{partner.partneremail}</td>
                    <td className={styles.td}>
                      {partner.partnerphonenumber &&
                        phoneMask(partner.partnerphonenumber)
                      }
                    </td>
                    <td className={styles.td}>{partner.openinghours}</td>
                    <td className={styles.td}>{partner.categorypartner}</td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <Link href={`/editpartner?id=${partner.id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <RiDeleteBinLine onClick={() => {
                        setSelectedPartnerId(partner.id);
                        setIsModalOpen(true);
                      }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalOpen && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Excluir Parceiro</h2>
                  <p>Deseja realmente excluir este parceiro?</p>
                  <div className={styles.modalButtons}>
                    <button onClick={handleDeletePartner}>Excluir</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
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