import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './newadm.module.scss';
import { useRouter } from 'next/router';

export default function NewAdm() {

  const router = useRouter();

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [typeValue, setypeValue] = useState('ADM');

  const { user } = useContext(AuthContext);

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
 
  const addAdminitrador = async (e) => {
    e.preventDefault();

    if (passwordValue != confirmPasswordValue) {
      alert('Campos de senha e confirme sua senha estão diferentes');
    } else {

      const newAdm = {
        username: usernameValue,
        email: emailValue,
        cpf: cpfValue.toString().replace(/\.|-/gm, ''),
        password: passwordValue,
        type: typeValue
      }

      console.log(newAdm);

      try {
        const response = await api.post(`/api/usuarios/postuseradm`, newAdm)
        if (response.status === 200) {
          alert('Usuario Administrador cadastrado com sucesso.');
          router.push(`/adms`);
        } else {
          alert('Erro ao cadastrar administrador.');
        }
      } catch (error) {
        console.log(error)
      }

    }

  }

  return (
    <>
      <main>
        <LayoutDashBoard>
          <div className={styles.container}>
            <div className={styles.topbar}>
              <span className={styles.topbartitle}>Novo Administrador</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <div className={styles.sectiontitle}>Dados do Administrador</div>
                <form onSubmit={addAdminitrador}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="username"
                      name="username"
                      maxLength='70'
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
                      maxLength='70'
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
                      value={cpfValue}
                      maxLength='14'
                      onChange={e => handleChangeMaskCpf(e)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="senha">Senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="password"
                      name="password"
                      maxLength='70'
                      onChange={e => setPasswordValue(e.target.value)}
                      required
                    />
                    <label className={styles.formlabel} htmlFor="senha">Confirme sua senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="confirmpassword"
                      name="confirmpassword"
                      maxLength='70'
                      onChange={e => setConfirmPasswordValue(e.target.value)}
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

                  <button className={styles.button} type="submit">Cadastrar</button>
                </form>
              </div>
            </div>
          </div>
        </LayoutDashBoard >
      </main >
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