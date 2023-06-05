import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';

import { RiDeleteBinLine } from 'react-icons/ri';

import styles from './payments.module.scss';

export default function Payments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      usuario: 'João',
      valor: 100.00,
      status: 'Pendente',
      dataVencimento: '10/06/2023',
    },
    {
      id: 2,
      usuario: 'Pedro',
      valor: 50.00,
      status: 'Quitado',
      dataVencimento: '05/06/2023',
    },
    // Adicione mais pagamentos aqui
  ]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  const handleDeletePayment = (paymentId) => {
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
  };

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Pagamentos</span>
            </div>
            <div className={styles.containercards}>
              <div className={styles.card}>
                <div className={styles.cardusers}>
                  <span className={styles.cardtitle}>{payments.length}</span>
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
            </div>

            <div className={styles.ctpainel}>
              <Link href='/newpayment' className={styles.btnewuser}>Novo pagamento</Link>
            </div>

            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Usuário</th>
                  <th className={styles.th}>Valor</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Data de Vencimento</th>
                  <th className={styles.th}>Editar</th>
                  <th className={styles.th}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className={styles.tr}>
                    <td className={styles.td}>{payment.usuario}</td>
                    <td className={styles.td}>{payment.valor}</td>
                    <td className={styles.td}>{payment.status}</td>
                    <td className={styles.td}>{payment.dataVencimento}</td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <Link href={`/editpayment?id=${payment.id}`}>
                          <FaEdit />
                      </Link>
                    </td>
                    <td className={`${styles.td} ${styles.tdcenter}`}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeletePayment(payment.id)}
                      >
                        <RiDeleteBinLine/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showConfirmationModal && (
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
            )}
          </div>
        </LayoutDashboard>
      </main>
    </>
  );
}