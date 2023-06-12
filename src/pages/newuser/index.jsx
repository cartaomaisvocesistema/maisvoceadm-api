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

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('balcao');

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [typeUserValue, setTypeUserValue] = useState('1');
  const [paymentTypeValue, setPaymentTypeValue] = useState('');
  const [cardNumberValue, setCardNumberValue] = useState('');
  const [nameTitularValue, setNameTitularValue] = useState('');
  const [validadeValue, setValidadeValue] = useState('');
  const [cvvValue, setCvvValue] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {

  }, [])

  function resetSignatureCredit() {
    setCardNumberValue('');
    setNameTitularValue('');
    setValidadeValue('');
    setCvvValue('');
  }

  function handleOptions(event) {
    const { value } = event.target;
    if (value === 'balcao' || value === 'signatureboleto') {
      resetSignatureCredit();
    }
    setOpcaoSelecionada(value);
  }

  const addUsuario = async (e) => {
    e.preventDefault();

    let pt = '';
    if (opcaoSelecionada === 'balcao') {
      pt = paymentTypeValue;
    } else {
      if (opcaoSelecionada === 'signatureboleto') {
        pt = '5';
      } else {
        if (opcaoSelecionada === 'signaturecredit') {
          pt = '6';
        }
      }
    }


    const newUser1 = {
      username: usernameValue,
      email: emailValue,
      cpf: cpfValue,
      address: addressValue,
      phone: phoneValue,
      password: passwordValue,
      type: typeUserValue,
      selectedoption: opcaoSelecionada,
      paymenttype: pt
    }

    let newUser = {
      ...newUser1
    };


    if (opcaoSelecionada === 'signaturecredit') {
      const newUserCredit = {
        cardnumber: cardNumberValue,
        nametitular: nameTitularValue,
        validade: validadeValue,
        cvv: cvvValue
      }

      newUser = {
        ...newUser1,
        ...newUserCredit
      };

    }

    console.log(newUser);

    try {
      /*const response = await api.post(`/api/usuarios/`, newUser)
      if (response.status === 200) {
        alert('Usuario cadastrado com sucesso.');
        router.push('/users/');
      } else {
        alert('Erro ao cadastrado com usuario.');
      }*/
    } catch (error) {
      console.log(error)
    }

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
                      onChange={e => setCpfValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="endereco">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="address"
                      name="address"
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
                      onChange={e => setPhoneValue(e.target.value)}
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="senha">Senha:</label>
                    <input
                      className={styles.forminputtext}
                      type="password"
                      id="password"
                      name="password"
                      onChange={e => setPasswordValue(e.target.value)}
                      required
                    />
                    {/*<input
                      className={styles.forminputtext}
                      type="password"
                      id="confirmpassword"
                      name="confirmpassword"
                      onChange={e => setConfirmPasswordValue(e.target.value)}
                      required
  />*/}
                  </div>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select
                      className={styles.forminputtext}
                      id="tipo"
                      name="tipo"
                      required
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
                          name="typepayment"
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
                          id="paymenttype1"
                          name="paymenttype1"
                          value={paymentTypeValue}
                          onChange={e => setPaymentTypeValue(e.target.value)}
                          required
                          disabled={!(opcaoSelecionada === 'balcao')}
                        >
                          <option value="1">Cartão de Crédito</option>
                          <option value="2">Cartão de Debito</option>
                          <option value="3">Dinheiro</option>
                          <option value="4">Pix</option>
                        </select>
                      </div>
                      <label>
                        <input
                          name="typepayment"
                          type="radio"
                          value="signatureboleto"
                          checked={opcaoSelecionada === 'signatureboleto'}
                          onChange={handleOptions}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Boleto</span>
                      </label>
                      <label>
                        <input
                          name="typepayment"
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
                          value={cardNumberValue}
                          onChange={e => setCardNumberValue(e.target.value)}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="nametitular">Nome do titular:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="nametitular"
                          name="nametitular"
                          value={nameTitularValue}
                          onChange={e => setNameTitularValue(e.target.value)}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="validade">Validade:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="validade"
                          name="validade"
                          value={validadeValue}
                          onChange={e => setValidadeValue(e.target.value)}
                          disabled={!(opcaoSelecionada === 'signaturecredit')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="cvv">CVV:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cvvValue}
                          onChange={e => setCvvValue(e.target.value)}
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