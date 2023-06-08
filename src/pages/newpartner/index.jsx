import React, { useState } from "react";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './newpartner.module.scss';

export default function NewPartner() {
  const [statusInicial, setStatusInicial] = useState('2');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('email');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [periodoManha, setPeriodoManha] = useState(false);
  const [periodoTarde, setPeriodoTarde] = useState(false);
  const [periodoNoite, setPeriodoNoite] = useState(false);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    //api.get('/users')
  }, [])

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

  const handlePeriodoChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'manha') {
      setPeriodoManha(checked);
    } else if (name === 'tarde') {
      setPeriodoTarde(checked);
    } else if (name === 'noite') {
      setPeriodoNoite(checked);
    }
  };

  const definirSenhaViaEmail = opcaoSelecionada === 'email';

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para lidar com o envio do formulário
  };

  return (
    <main>
      <LayoutDashboard>
        <div className={styles.container}>
          <div className={styles.topbar}>
            <span className={styles.topbartitle}>Novo Parceiro</span>
          </div>
          <div className={styles.card}>
            <div className={styles.formcontainer}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="nome">
                    Nome:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="nome"
                    name="nome"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="descricao">
                    Descrição:
                  </label>
                  <textarea
                    className={styles.forminputtext}
                    id="descricao"
                    name="descricao"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="email">
                    Email:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="telefone">
                    Telefone:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="tel"
                    id="telefone"
                    name="telefone"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="endereco">
                    Endereço:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="text"
                    id="endereco"
                    name="endereco"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="website">
                    Website:
                  </label>
                  <input
                    className={styles.forminputtext}
                    type="url"
                    id="website"
                    name="website"
                    required
                  />
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="periodo">
                    Período:
                  </label>
                  <div className={styles.checkboxgroup}>
                    <label>
                      <input
                        type="checkbox"
                        name="manha"
                        checked={periodoManha}
                        onChange={handlePeriodoChange}
                      />
                      <span className={styles.checkbox1}>Manhã</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="tarde"
                        checked={periodoTarde}
                        onChange={handlePeriodoChange}
                      />
                      <span className={styles.checkbox1}>Tarde</span>
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="noite"
                        checked={periodoNoite}
                        onChange={handlePeriodoChange}
                      />
                      <span className={styles.checkbox1}>Noite</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formgroup}>
                  <label className={styles.formlabel} htmlFor="categoria">
                    Categoria:
                  </label>
                  <select
                    className={styles.forminputtext}
                    id="categoria"
                    name="categoria"
                    required
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="saude">Saúde</option>
                    <option value="comercio">Comércio</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <button className={styles.button} type="submit">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </main>
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