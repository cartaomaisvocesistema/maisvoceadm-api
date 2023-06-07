import {v4 as uuid} from 'uuid'
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount)) 
export async function signInRequest(data){
    await delay()
    return {
        token: uuid(),
        user: {
            name: 'BAldez jr',
            email: 'baldez@baldino'
        } 
    }
}