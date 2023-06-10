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

  const { user } = useContext(AuthContext)
  const [userForm, setUserForm] = useState({});

  useEffect(() => {
    recoveryUser()
  }, [])

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  }

  const recoveryUser = async () => {
    const { id } = router.query;
    const response = await api.get(`/api/usuarios/${id}`)
    const result = (response).data;
    setUserForm(result);
  }

  const updateUsuario = async (e) => {
    e.preventDefault();
    console.log(userForm);
    const response = await api.patch(`/api/usuarios/`, userForm)
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
                <form>
                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="nome">Nome:</label>
                    <input
                      value={userForm.username}
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
                      required />
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="status">Status:</label>
                    <select
                      className={styles.forminputtext}
                      id="status"
                      name="status"
                      required
                      value="2"
                      enabled
                    >
                      <option value="">Selecione o status inicial</option>
                      <option value="1">Ativo</option>
                      <option value="2">Pendente</option>
                    </select>
                  </div>

                  <div className={styles.formgroup}>
                    <label className={styles.formlabel} htmlFor="tipo">Tipo:</label>
                    <select className={styles.forminputtext} id="tipo" name="tipo" required defaultValue="1" disabled>
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