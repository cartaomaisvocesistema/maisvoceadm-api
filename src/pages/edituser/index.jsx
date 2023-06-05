import React from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";

import styles from './edituser.module.scss';

export default function NewUser() {
  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Edição de Usuário</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <form>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input className={styles.forminputtext} type="text" id="nome" name="nome" required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input className={styles.forminputtext} type="email" id="email" name="email" required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cpf">CPF:</label>
                    <input className={styles.forminputtext} type="text" id="cpf" name="cpf" required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
                    <input className={styles.forminputtext} type="text" id="endereco" name="endereco" required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="status">Status:</label>
                    <select
                      className={styles.forminputtext}
                      id="status"
                      name="status"
                      required
                      value="2"
                      enabled
                    >
                      <option value="">Selecione o status inicial</option>
                      <option value="1">Ativo</option>
                      <option value="2">Pendente</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select className={styles.forminputtext} id="tipo" name="tipo" required defaultValue="1" disabled>
                      <option value="">Selecione o tipo</option>
                      <option value="1">Cliente</option>
                      <option value="2">Administrador</option>
                    </select>
                  </div>

                  <button className={styles.button} type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        </LayoutDashBoard>
      </main>
    </>
  )
}