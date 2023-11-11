import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './editadm.module.scss';
import { useRouter } from 'next/router';

import { api } from "../../services/api";


export default function EditAdm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [typeValue, setypeValue] = useState('ADM');

  const { user } = useContext(AuthContext)

  useEffect(() => {
    recoveryUser()
  }, [])

  const recoveryUser = async () => {
    try {
      const { id } = router.query;
      const response = await api.get(`/api/usuarios/${id}`)
      const data = (response).data;

      if (data.username)
        setUsernameValue(data.username);

      if (data.email)
        setEmailValue(data.email);

      if (data.cpf)
        setCpfValue(data.cpf);

      if (data.type)
        setypeValue(data.type)

    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeMaskCpf(e) {
    const { value } = e.target;
    setCpfValue(cpfMask(value))
  }

  const cpfMask = value => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const handleChangeMaskPhone = (e) => {
    const { value } = e.target
    setPhoneValue(phoneMask(value))
  }

  const phoneMask = (value) => {
    if (!value) return ""
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
  }

  const updateAdm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { id } = router.query;

    const updatedUser = {
      id: id,
      username: usernameValue,
      email: emailValue,
      cpf: cpfValue.toString().replace(/\.|-/gm, ''),
      type: typeValue
    }

    console.log(updatedUser);

    try {
      const response = await api.patch(`/api/usuarios/admpatch`, updatedUser)
      console.log(response.status);
      if (response.status === 200) {
        alert('Usuario atualizado com sucesso.');
        router.push('/adms/');
      } else {
        alert('Erro ao atualizar usuario.');
      }
    } catch (error) {
      alert('Erro ao atualizar usuario.');
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Edição de Administrador</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <div className={styles.sectiontitle}>Dados pessoais</div>
                <form onSubmit={updateAdm}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="username"
                      name="username"
                      value={usernameValue}
                      maxLength="70"
                      placeholder="ex. João da Silva"
                      onChange={e => setUsernameValue(e.target.value)}
                      required />
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input
                      className={styles.forminputtext}
                      type="email"
                      id="email"
                      name="email"
                      value={emailValue}
                      maxLength="70"
                      placeholder="joao@gmail.com"
                      onChange={e => setEmailValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cpf">CPF:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={cpfMask(cpfValue)}
                      placeholder="000.000.000-00"
                      onChange={e => handleChangeMaskCpf(e)}
                      maxLength="14"
                      disabled
                      required
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select
                      className={styles.forminputtext}
                      id="tipo"
                      name="tipo"
                      value={typeValue}
                      onChange={e => setypeValue(e.target.value)}
                      required>
                      <option value="ADM">Administrador</option>
                      <option value="ADM_SECRETARIADO">Secretariado</option>
                    </select>
                  </div>

                  <button
                    className={styles.button}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Carregando...' : 'Salvar'}
                  </button>

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