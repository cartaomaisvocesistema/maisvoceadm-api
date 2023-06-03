
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import Link from 'next/link';

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

            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Status</th>
                  <th>Data do Último Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.cpf}</td>
                    <td>{user.status}</td>
                    <td>{user.lastPaymentDate}</td>
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