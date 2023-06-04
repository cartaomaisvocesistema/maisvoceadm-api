import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";

import styles from './newuser.module.scss';

export default function NewUser() {

  const [definirSenhaViaEmail, setDefinirSenhaViaEmail] = useState(true);
  const [definirSenhaManualmente, setDefinirSenhaManualmente] = useState(false);
  const [desativarPrimeiroCheckbox, setDesativarPrimeiroCheckbox] = useState(false);
  const [desativarSegundoCheckbox, setDesativarSegundoCheckbox] = useState(false);

  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

  const handleDefinirSenhaChange = (event) => {
    setDefinirSenhaViaEmail(event.target.checked);
    setSenha("");
    setConfirmacaoSenha("");
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmacaoSenhaChange = (event) => {
    setConfirmacaoSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados do formulário
  };

  const handleDefinirSenhaChange2 = () => {
    if (desativarPrimeiroCheckbox) {
      setDefinirSenhaViaEmail(false);
    } else {
      setDefinirSenhaViaEmail(!definirSenhaViaEmail);
    }
  };

  const handleDesativarPrimeiroCheckboxChange = () => {
    setDesativarPrimeiroCheckbox(!desativarPrimeiroCheckbox);
    setDefinirSenhaViaEmail(false);
    setDesativarSegundoCheckbox(true);
  };






  
  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Novo Usuário</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <form onSubmit={handleSubmit}>
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
                    <label className={styles.formlabel} htmlFor="senha">Senha:</label>
                    <div className={styles.checkboxgroup}>
                      {/* <input
                        type="checkbox"
                        id="definirSenha"
                        name="definirSenha"
                        checked={definirSenhaViaEmail}
                        onChange={handleDefinirSenhaChange}
                      />
                      <label className={styles.formlabel} htmlFor="definirSenha">Definir senha via email</label>

                      <input
                        type="checkbox"
                        id="desativarPrimeiroCheckbox"
                        name="desativarPrimeiroCheckbox"
                        checked={desativarPrimeiroCheckbox}
                        onChange={handleDesativarPrimeiroCheckboxChange}
                      />
                      <label className={styles.formlabel} htmlFor="desativarPrimeiroCheckbox">
                        Desativar primeiro checkbox
                      </label> */}
                    </div>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="senha"
                      name="senha"
                      value={senha}
                      onChange={handleSenhaChange}
                      required={!definirSenhaViaEmail}
                      disabled={definirSenhaViaEmail}
                    />
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="confirmacaoSenha"
                      name="confirmacaoSenha"
                      value={confirmacaoSenha}
                      onChange={handleConfirmacaoSenhaChange}
                      required={!definirSenhaViaEmail}
                      disabled={definirSenhaViaEmail}
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select className={styles.forminputtext} id="tipo" name="tipo" required>
                      <option value="">Selecione o tipo</option>
                      <option value="1">Opção 1</option>
                      <option value="2">Opção 2</option>
                      <option value="3">Opção 3</option>
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