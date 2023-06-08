import {createContext, useEffect} from 'react';
import {recoverUserInformation, signInRequest} from '../services/auth'
import {setCookie, parseCookies} from 'nookies'
import Router from 'next/router'
import { useState } from 'react';


export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const {'nextAuth.token': token} = parseCookies() 
        if(token){
            recoverUserInformation().then(response => {
                setUser(response.user)
            })
        }

    }, [])
    // seria o lugar correto para fazer a chamada na api, trazer o token e dados do usuario
    async function signIn({email, password}){
        const { token, user } = await signInRequest({
            email,
            password
        })

        setCookie(undefined, 'nextAuth.token', token, {
            maxAge: 60 * 60 * 12,  
        });
        setUser(user)

        Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, signIn, user}}>
            {children}
        </AuthContext.Provider>
    )
}