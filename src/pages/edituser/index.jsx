import React, { useState } from "react";
import LayoutDashBoard from "@/layouts/LayoutDashboard";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from "nookies";
import { getAPIClient } from "@/services/axios";
import styles from './edituser.module.scss';
import { useRouter } from 'next/router';

import { api } from "../../services/api";


export default function EditUser() {

  const router = useRouter();

  const [creditSelected, setCreditSelected] = useState(false);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState('BOLETO');

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [cpfValue, setCpfValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const [alterPaymentTypeValue, setAlterPaymentTypeValue] = useState(false);

  const [paymentTypeValue, setPaymentTypeValue] = useState('1');
  const [cardNumberValue, setCardNumberValue] = useState('');
  const [nameTitularValue, setNameTitularValue] = useState('');
  const [validadeValue, setValidadeValue] = useState('');
  const [cvvValue, setCvvValue] = useState('');
  const [agreementTypeValue, setAgreementTypeValue] = useState('STANDARD');


  const { user } = useContext(AuthContext)

  useEffect(() => {
    recoveryUser()
  }, [])

  const handleCheckboxChange = () => {
    setCreditSelected(!creditSelected);
  };

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

      if (data.address)
        setAddressValue(data.address);

      if (data.phone)
        setPhoneValue(data.phone);
    } catch (error) {
      console.log(error);
    }
  }

  function resetSignatureCredit() {
    setCardNumberValue('');
    setNameTitularValue('');
    setValidadeValue('');
    setCvvValue('');
  }

  function handleOptions(event) {
    const { value } = event.target;
    if (value === 'UNDEFINED' || value === 'BOLETO') {
      resetSignatureCredit();
    }
    setOpcaoSelecionada(value);
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

  function handleChangeMaskCvv(e) {
    const { value } = e.target;
    setCvvValue(cvvMask(value));
  }

  const cvvMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .substr(0, 3);
  };

  function handleChangeMaskDate(e) {
    const { value } = e.target;
    setValidadeValue(dateMask(value));
  }

  const dateMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2")
      .trim()
      .substr(0, 5);
  };

  function handleChangeMaskCreditCard(e) {
    const { value } = e.target;
    setCardNumberValue(creditCardMask(value));
  }

  const creditCardMask = value => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
      .trim()
      .substr(0, 19);
  };

  function handleAlterPaymentType() {
    setAlterPaymentTypeValue(!alterPaymentTypeValue);
  }

  const updateUsuario = async (e) => {
    e.preventDefault();

    const { id } = router.query;

    let pt = '';
    if (opcaoSelecionada === 'UNDEFINED') {
      pt = paymentTypeValue;
    } else {
      if (opcaoSelecionada === 'BOLETO') {
        pt = '5';
      } else {
        if (opcaoSelecionada === 'CREDIT_CARD') {
          pt = '6';
        }
      }
    }

    const updatedUser1 = {
      id: id,
      username: usernameValue,
      email: emailValue,
      cpf: cpfValue.toString().replace(/\.|-/gm, ''),
      address: addressValue,
      phone: phoneValue.toString().replace(/\D/g, ''),
      alterPaymentType: alterPaymentTypeValue
    }

    let updatedUser = {
      ...updatedUser1
    };

    if (alterPaymentTypeValue) {
      updatedUser.paymenttype = pt
      updatedUser.newPaymentType = opcaoSelecionada

      if (opcaoSelecionada === 'CREDIT_CARD') {
        const updatedUserCredit = {
          cardnumber: cardNumberValue.replace(/\s/g, ""),
          nametitular: nameTitularValue,
          validade: validadeValue,
          ccv: cvvValue
        }

        updatedUser = {
          ...updatedUser,
          ...updatedUser1,
          ...updatedUserCredit
        };

      }
    }

    try {
      const response = await api.patch(`/api/usuarios/admpatch`, updatedUser)
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
                    <label className={styles.formlabel} htmlFor="address">Endereço:</label>
                    <input
                      className={styles.forminputtext}
                      type="text"
                      id="address"
                      name="address"
                      value={addressValue}
                      maxLength="70"
                      placeholder="ex. Rua José Pedro da Silva"
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
                      value={phoneMask(phoneValue)}
                      maxLength="15"
                      placeholder="(53)99999-9999"
                      onChange={e => handleChangeMaskPhone(e)}
                      required />
                  </div>

                  <div className={styles.formgrouppayment}>
                    <div className={styles.checkboxgrouppayment}>
                      <label>
                        <input
                          checked={alterPaymentTypeValue}
                          type="checkbox"
                          id="alterPaymentType"
                          name="alterPaymentType"
                          value="ALTERPAYMENTTYPE"
                          className={styles.checkboxaccept}
                          onChange={handleAlterPaymentType}
                        />
                        <span className={styles.checkbox1comnegrito}>Alterar forma de pagamento</span>
                      </label>
                    </div>
                  </div>

                  <div className={alterPaymentTypeValue ? styles.sectiontitle : styles.sectiontitleopacity}>Alterar forma de pagamento</div>

                  <div className={alterPaymentTypeValue ? styles.formgrouppayment : styles.formgrouppaymentopacity}>
                    <div className={styles.checkboxgrouppayment}>
                      <label>
                        <input
                          name="typepayment"
                          type="radio"
                          value="BOLETO"
                          checked={opcaoSelecionada === 'BOLETO'}
                          onChange={handleOptions}
                          disabled={!alterPaymentTypeValue}
                        />
                        <span className={styles.checkbox1comnegrito}>Pagamento via assinatura - Boleto</span>
                      </label>
                      <br />
                      <label>
                        <input
                          name="typepayment"
                          type="radio"
                          value="CREDIT_CARD"
                          checked={opcaoSelecionada === 'CREDIT_CARD'}
                          onChange={handleOptions}
                          disabled={!alterPaymentTypeValue}
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
                          maxLength="19"
                          placeholder="0000 0000 0000 0000"

                          onChange={e => handleChangeMaskCreditCard(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="nametitular">Nome do titular:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="nametitular"
                          name="nametitular"
                          value={nameTitularValue}
                          maxLength="70"
                          placeholder="ex. João da Silva"
                          onChange={e => setNameTitularValue(e.target.value)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="validade">Validade:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="validade"
                          name="validade"
                          value={validadeValue}
                          maxLength="5"
                          placeholder="10/10"
                          onChange={e => handleChangeMaskDate(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />

                        <label className={styles.formlabelsemnegrito} htmlFor="cvv">CVV:</label>
                        <input
                          className={styles.forminputtext}
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cvvValue}
                          maxLength="3"
                          placeholder="123"
                          onChange={e => handleChangeMaskCvv(e)}
                          disabled={!(opcaoSelecionada === 'CREDIT_CARD')}
                          required />
                      </div>
                      <label>
                        <input
                          type="radio"
                          name="typepayment"
                          value="UNDEFINED"
                          checked={opcaoSelecionada === 'UNDEFINED'}
                          onChange={handleOptions}
                          disabled={!alterPaymentTypeValue}
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
                          disabled={!(opcaoSelecionada === 'UNDEFINED')}
                        >
                          <option value="1">Cartão de Crédito</option>
                          <option value="2">Cartão de Debito</option>
                          <option value="3">Dinheiro</option>
                          <option value="4">Pix</option>
                        </select>
                      </div>
                    </div>
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