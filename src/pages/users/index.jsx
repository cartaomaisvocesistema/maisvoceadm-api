
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './users.module.scss';

export default function Users() {

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

            <div className={styles.ctpainel}>
              <Link href='/newuser' className={styles.btnewuser}>Novo usuário</Link>
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
                    <td className={`${styles.td} ${styles.tdcenter}`}><FaEdit/></td>
                    <td className={`${styles.td} ${styles.tdcenter}`}><RiDeleteBinLine/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}