import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import { api } from "../../services/api";
import styles from './newuser.module.scss';
import { useRouter } from 'next/router';

export default function NewUser() {

  const router = useRouter();

  const [statusInicial, setStatusInicial] = useState('1');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('balcao');
  
  const [userForm, setUserForm] = useState({});
  const [passwordValue, setPasswordValue] = useState();
  const [confirmPasswordValue, setConfirmPasswordValue] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {

  }, [])

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  }

  const handleCategory = (e) => {
    
  }

  const handleOptions = (event) => {
    const { value } = event.target;
    setOpcaoSelecionada(value);

  }

  const handleOpcaoChange = (event) => {
    const { value } = event.target;
    setOpcaoSelecionada(value);
    setStatusInicial(value === 'boleto' ? '1' : value === 'signatureboleto' ? '2' : '3');
    setOpcaoSelecionada(event.target.value);
  };

  const addUsuario = async (e) => {
    e.preventDefault();

    /*const response = await api.post(`/api/usuarios/`, {
      username: "fernanda3",
      password: "1234",
      email: "fernanda@gmail.com"
    })*/
    try {
      const response = await api.post(`/api/usuarios/`, userForm)
      if (response.status === 200) {
        alert('Usuario cadastrado com sucesso.');
        router.push('/users/');
      } else {
        alert('Erro ao cadastrado com usuario.');
      }
    } catch (error) {
      console.log(error)
    }
    console.log(userForm);
  }

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
                <div className={styles.sectiontitle}>Dados pessoais</div>
                <form onSubmit={addUsuario}>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="email">Email:</label>
                    <input
                      className={styles.forminputtext}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="cpf">CPF:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="cpf"
                      name="cpf"
                      onChange={handleChange}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Telefone:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="senha">Senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    {/*<input
                      className={styles.forminputtext}
                      type="password"
                      id="confirmpassword"
                      name="confirmpassword"
                      onChange={handleChange}
                      required
  />*/}
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select
                      className={styles.forminputtext}
                      onChange={handleCategory}
                      id="tipo"
                      name="tipo"
                      required
                      defaultValue="1"
                      disabled>
                      <option value="">Selecione o tipo</option>
                      <option value="1">Titular</option>
                    </select>
                  </div>

                  <div className={styles.sectiontitle}>Pagamentos</div>

                  <div className={styles.formgrouppayment}>
                    <div className={styles.checkboxgrouppayment}>
                      <label>
                        <input
                          type="radio"
                          value="balcao"
                          checked={opcaoSelecionada === 'balcao'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento no balcão</span>
                      </label>
                      <div className={styles.formgroup}>
                        <label className={styles.formlabelsemnegrito} htmlFor="paymenttype1">Forma de pagamento:</label>
                        <select
                          className={styles.forminputtext}
                          onChange={handleCategory}
                          id="paymenttype1"
                          name="paymenttype1"
                          required
                          disabled={!(opcaoSelecionada === 'balcao')}
                          defaultValue="1"
                        >
                          <option value="1">Cartão de Crédito</option>
                          <option value="2">Cartão de Debito</option>
                          <option value="3">Dinheiro</option>
                          <option value="4">Pix</option>
                        </select>
                      </div>
                      <label>
                        <input
                          type="radio"
                          value="signatureboleto"
                          checked={opcaoSelecionada === 'signatureboleto'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Boleto</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="signaturecredit"
                          checked={opcaoSelecionada === 'signaturecredit'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Cartão de crédito</span>
                      </label>
                      <div className={styles.formgroup}>
                        <label className={styles.formlabelsemnegrito} htmlFor="cardnumber">Número do cartão:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          onChange={handleChange}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="nametitular">Nome do titular:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="nametitular"
                          name="nametitular"
                          onChange={handleChange}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="validade">Validade:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="validade"
                          name="validade"
                          onChange={handleChange}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="cvv">CVV:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cvv"
                          name="cvv"
                          onChange={handleChange}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />
                      </div>

                    </div>
                  </div>


                  <button className={styles.button} type="submit">Enviar</button>
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