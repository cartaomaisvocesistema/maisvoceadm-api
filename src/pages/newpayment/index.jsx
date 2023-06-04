import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import styles from './newpayment.module.scss';

export default function NewPayment() {
  const [usuario, setUsuario] = useState('');
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleFormaPagamentoChange = (event) => {
    setFormaPagamento(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsuario('');
    setValor('');
    setFormaPagamento('');
  };

  return (
    <>
      <main>
        <LayoutDashboard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Novo Pagamento</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="usuario">Usuário:</label>
                    <select
                      className={styles.forminputtext}
                      id="usuario"
                      name="usuario"
                      value={usuario}
                      onChange={handleUsuarioChange}
                      required
                    >
                      <option value="">Selecione o usuário</option>
                      <option value="Pedro">Pedro</option>
                      <option value="João">João</option>
                      <option value="Marcelo">Marcelo</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="valor">Valor:</label>
                    <input
                      className={styles.forminputtext}
                      type="number"
                      id="valor"
                      name="valor"
                      value={valor}
                      onChange={handleValorChange}
                      required
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="formaPagamento">Forma de Pagamento:</label>
                    <select
                      className={styles.forminputtext}
                      id="formaPagamento"
                      name="formaPagamento"
                      value={formaPagamento}
                      onChange={handleFormaPagamentoChange}
                      required
                    >
                      <option value="">Selecione a forma de pagamento</option>
                      <option value="cartaoCreditoCredito">Cartão de Crédito - Crédito</option>
                      <option value="cartaoCreditoDebito">Cartão de Crédito - Débito</option>
                      <option value="pix">PIX</option>
                      <option value="dinheiro">Dinheiro</option>
                    </select>
                  </div>

                  <button className={styles.button} type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </LayoutDashboard>
      </main>
    </>
  );
}