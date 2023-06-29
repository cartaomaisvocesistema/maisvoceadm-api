import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './newdependent.module.scss';
import { useRouter } from 'next/router';

export default function NewDependent() {

  const router = useRouter();

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('balcao');

  const [messageDependentValue, setMessageDependentValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [typeUserValue, setTypeUserValue] = useState('C_DEPENDENTE_GRATUITO');
  const [typeValue, setypeValue] = useState('');
  const { cardnumber } = router.query;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    showTypeDependent();
  }, [])

  const showTypeDependent = async () => {
    const response = await api.get(`/api/usuarios/getdependents/${cardnumber}`)
    const result = (response).data;

    const dependentFree = result.users.filter(user => user.type === 'C_DEPENDENTE_GRATUITO');
    const dependentExtra = result.users.filter(user => user.type === 'C_DEPENDENTE_EXTRA');
    const titular = result.users.filter(user => user.type == 'C_TITULAR')[0];

    let message = `${titular.username} possui ${dependentFree.length} dependente(s) gratuito(s) do total de 2`;
    let type = 'C_DEPENDENTE_GRATUITO';
    if (dependentFree.length == 2) {
      message = `${titular.username} já possui 2 dependentes gratuitos, e possui ${dependentExtra.length} dependentes extra do total de 2.`;
      type = 'C_DEPENDENTE_EXTRA';
    }
    setypeValue(type);
    setMessageDependentValue(message);
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

  const addDependente = async (e) => {
    e.preventDefault();

    if (passwordValue != confirmPasswordValue) {
      alert('Campos de senha e confirme sua senha estão diferentes');
    } else {

      const newDependent = {
        username: usernameValue,
        email: emailValue,
        cpf: cpfValue.toString().replace(/\.|-/gm, ''),
        address: addressValue,
        phone: phoneValue.toString().replace(/\D/g, ''),
        password: passwordValue,
        type: typeValue,
        cartaotitular: cardnumber
      }

      console.log(newDependent);

      try {
        const response = await api.post(`/api/usuarios/`, newDependent)
        if (response.status === 200) {
          alert('Dependente cadastrado com sucesso.');
          router.push(`/dependents?cardnumber=${cardnumber}`);
        } else {
          alert('Erro ao cadastrar dependente.');
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
              <span className={styles.topbartitle}>Novo Dependente</span>
            </div>
            <div className={styles.card}>
              <div className={styles.formcontainer}>
                <div className={styles.sectiontitle}>Dados pessoais</div>
                <form onSubmit={addDependente}>
                  <div className={styles.formgroup}>
                    Obs:  {messageDependentValue}
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
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="address"
                      name="address"
                      maxLength='70'
                      onChange={e => setAddressValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="phone"
                      name="phone"
                      value={phoneValue}
                      maxLength='15'
                      onChange={e => handleChangeMaskPhone(e)}
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
                      required
                      disabled>
                      <option value="C_DEPENDENTE_GRATUITO">Gratuito</option>
                      <option value="C_DEPENDENTE_EXTRA">Extra</option>
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