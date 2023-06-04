import React from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './partners.module.scss';

export default function Partners() {
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

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.orangebar}></div>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Parceiros</span>
            </div>

            <div className={styles.ctpainel}>
              <Link href='/newpartner' className={styles.btnewuser}>Novo Parceiro</Link>
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
          </div>
        </LayoutDashboard>
      </main>
    </>
  );
}