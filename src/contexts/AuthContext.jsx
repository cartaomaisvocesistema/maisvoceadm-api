import { createContext, useEffect } from 'react';
import { recoverUserInformation, signInRequest } from '../services/auth'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { useState } from 'react';
import { api } from "../services/api";
import localStorage from 'localStorage';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const isAuthenticated = !!user;

  const fetchData = async (cpf, password) => {

    try {
      const response = await fetch(process.env.BASE_URL_API+"/api/autenticacao/loginadm", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cpf: cpf.toString().replace(/\.|-/gm, ''),
          password: password
        })
      });
      if (response.ok) {
        return response;
      } else {
        console.log('Erro na requisição:', response.status);
      }
    } catch (error) {
      console.log('Erro ao realizar a requisição:', error);
    }
  };


  useEffect(() => {
    const { 'nextAuth.token': token } = parseCookies()
    if (token) {
      recoverUserInformation().then(response => {
        setUser(response.user)
      })
    }

  }, [])
  // seria o lugar correto para fazer a chamada na api, trazer o token e dados do usuario
  async function signIn({ cpf, password }) {
    try {
      const response = await fetchData(cpf, password);
      const data = await response.json();
      if (data) {
        setCookie(undefined, 'nextAuth.token', data.token, {
          maxAge: 60 * 60 * 12,
        });
        api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userId', data.id);
        setUser(data.cpf)
        setToken(data.token)
        Router.push('/dashboard')
      } else {
        Router.push('/')
      }
    } catch (error) {
      alert('Falha na autenticação.');
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, token }}>
      {children}
    </AuthContext.Provider>
  )
}


