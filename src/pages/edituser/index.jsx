import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './edituser.module.scss';
import { useRouter } from 'next/router';

import { api } from "../../services/api";


export default function NewUser() {

  const router = useRouter();

  const [creditSelected, setCreditSelected] = useState(false);

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const { user } = useContext(AuthContext)

  useEffect(() => {
    recoveryUser()
  }, [])

  const handleCheckboxChange = () => {
    setCreditSelected(!creditSelected);
  };

  const recoveryUser = async () => {
    const { id } = router.query;
    const response = await api.get(`/api/usuarios/${id}`)
    const data = (response).data;

    if (data.username)
      setUsernameValue(data.username);

    if (data.email)
      setEmailValue(data.email);

    if (data.cpf)
      setCpfValue(data.cpf);

    if (data.address)
      setAddressValue(data.address);

    if (data.phone)
      setPhoneValue(data.phone);
  }

  const updateUsuario = async (e) => {
    e.preventDefault();

    const { id } = router.query;
    
    const updatedUser = {
      id: id,
      username: usernameValue,
      email: emailValue,
      cpf: cpfValue,
      address: addressValue,
      phone: phoneValue
    }

    try {
      const response = await api.patch(`/api/usuarios/`, updatedUser)
      console.log(response.status);
      if (response.status === 200) {
        alert('Usuario atualizado com sucesso.');
        router.push('/users/');
      } else {
        alert('Erro ao atualizar usuario.');
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                <div className={styles.sectiontitle}>Dados pessoais</div>
                <form onSubmit={updateUsuario}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="username"
                      name="username"
                      value={usernameValue}
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
                      onChange={e => setCpfValue(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={addressValue}
                      onChange={e => setAddressValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="phone">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="phone"
                      name="phone"
                      value={phoneValue}
                      onChange={e => setPhoneValue(e.target.value)}
                      required />
                  </div>

                  {/*

                  <div className={styles.sectiontitle}>Pagamentos</div>
                  <div className={styles.formgrouppayment}>
                    <div className={styles.checkboxgrouppayment}>
                      <label>
                        <input
                          type="checkbox"
                          checked={creditSelected}
                          onChange={handleCheckboxChange}
                        />
                        Habilitar Campo
                      </label>
                      <label className={styles.formlabel} htmlFor="phone">Telefone:</label>
                      <input
                        className={styles.forminputtext}
                        type="text"
                        id="phone"
                        name="phone"
                        value={phoneValue}
                        onChange={e => setPhoneValue(e.target.value)}
                        required
                        disabled={!creditSelected} />
                    </div>

                  </div>
*/}
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