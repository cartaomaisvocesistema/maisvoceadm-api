import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './newuser.module.scss';

export default function NewUser() {


  const [statusInicial, setStatusInicial] = useState('2');

  const handleOpcaoChange2 = (event) => {
    
  };
  const { user } = useContext(AuthContext)

  useEffect(() => {
    //api.get('/users')
  }, [])

  const addUsuario =  async (username, email) => {
    const response = await api.post(`/api/usuarios/` , {
      username: username,
      senha: email,
    })
  }

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('email');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleOpcaoChange = (event) => {
    const { value } = event.target;
    setOpcaoSelecionada(value);
    setStatusInicial(value === 'email' ? '2' : '1');
    setOpcaoSelecionada(event.target.value);
    setSenha('');
    setConfirmacaoSenha('');
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmacaoSenhaChange = (event) => {
    setConfirmacaoSenha(event.target.value);
  };

  const definirSenhaViaEmail = opcaoSelecionada === 'email';

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
                    <label className={styles.formlabel} htmlFor="senha">Senha:</label>
                    <div className={styles.checkboxgroup}>
                      <label >
                        <input
                          type="radio"
                          value="email"
                          checked={opcaoSelecionada === 'email'}
                          onChange={handleOpcaoChange}
                        />
                        <span className={styles.checkbox1}>Definir senha via Email</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          value="manual"
                          checked={opcaoSelecionada === 'manual'}
                          onChange={handleOpcaoChange}
                        />
                        <span className={styles.checkbox1}>Definir senha manualmente</span>
                      </label>
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
                    <label className={styles.formlabel} htmlFor="status">Status:</label>
                    <select
                     className={styles.forminputtext}
                     id="status"
                     name="status"
                     required
                     value={statusInicial}
                     disabled
                     onChange={(event) => setStatusInicial(event.target.value)}
                    >
                      <option value="">Selecione o status inicial</option>
                      <option value="1">Ativo</option>
                      <option value="2">Pendente</option>
                    </select>
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select className={styles.forminputtext} id="tipo" name="tipo" required defaultValue="1" enabled>
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